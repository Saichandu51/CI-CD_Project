const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('./static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/getData', async (req, res) => {
    try {
        const inputUrl = req.body.url;
        console.log("Input URL:", inputUrl);

        const urlParts = inputUrl.split('/');
        const owner = urlParts[3];
        const repo = urlParts[4];

        if (!owner || !repo) {
            return res.status(400).json({ message: 'Invalid GitHub repository URL' });
        }

        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs`;
        console.log("API URL:", apiUrl);

        const response = await axios.get(apiUrl); // Add auth headers here if needed
        const data = response.data;

        if (!data.workflow_runs) {
            return res.status(400).json({ message: 'Invalid data format from API', data });
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching from GitHub API:', error.message);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
