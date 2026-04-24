const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
  res.send("Test working");
});
app.post("/add", async (req, res) => {
  try {
    const data = await User.create(req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schemas
const aboutSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  skills: [String],
  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    duration: String,
    description: String
  }]
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  liveUrl: String,
  githubUrl: String,
  imageUrl: String,
  featured: Boolean
});

const certificateSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  date: String,
  credentialId: String,
  credentialUrl: String,
  imageUrl: String
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// Models
const About = mongoose.model('About', aboutSchema);
const Project = mongoose.model('Project', projectSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Routes
// About routes
app.get('/api/about', async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/about', async (req, res) => {
  try {
    const about = new About(req.body);
    const savedAbout = await about.save();
    res.json(savedAbout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Project routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Certificate routes
app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/certificates', async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    const savedCertificate = await certificate.save();
    res.json(savedCertificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Contact routes
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
