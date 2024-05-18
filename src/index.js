require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Basic Route
app.get('/', (req, res) => {
  res.send('URL Summary API');
});

// Summarize Route
app.post('/summarize', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Fetch the content of the URL
    const response = await axios.get(url);
    const html = response.data;

    // Parse the HTML content
    const $ = cheerio.load(html);
    const textContent = $('body').text();

    // Generate summary using OpenAI
    const openaiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarize the following content: ${textContent}`,
      max_tokens: 150,
    });

    const summary = openaiResponse.data.choices[0].text.trim();

    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing URL:', error);
    res.status(500).json({ error: 'Failed to summarize URL' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});