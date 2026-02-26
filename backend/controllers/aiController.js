const axios = require("axios");

exports.getAiSuggestions = async (req, res) => {
  const { title, content } = req.body;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a blog writing assistant." },
          {
            role: "user",
            content: `Suggest 3 topics and a 2-sentence intro for: ${title}\n${content}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ suggestions: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Groq Error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI Failed" });
  }
};
