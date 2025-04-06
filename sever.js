const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err);
});

const changeSchema = new mongoose.Schema({
  change: String,
  timestamp: String
});

const Change = mongoose.model('Change', changeSchema);

app.post('/api/admin-changes', async (req, res) => {
  const { change } = req.body;
  const timestamp = new Date().toLocaleString();
  await Change.create({ change, timestamp });
  res.json({ message: 'Change logged' });
});

app.get('/api/admin-changes', async (req, res) => {
  const changes = await Change.find().sort({ _id: -1 });
  res.json(changes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
