// functions/chat.js

const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const userMessage = req.body.message;

        try {
            // Call the OpenAI API
            const response = await axios.post('https://api.openai.com/v1/completions', {
                model: 'text-davinci-003',
                prompt: userMessage,
                max_tokens: 150
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            // Send back the AI's response
            const botMessage = response.data.choices[0].text.trim();
            res.status(200).json({ message: botMessage });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'There was an error with the API request.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
