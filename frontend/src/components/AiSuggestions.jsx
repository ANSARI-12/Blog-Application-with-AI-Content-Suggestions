import { useState } from "react";
import axios from "axios";

export default function AiSuggestions() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSuggestions = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/ai-suggestions", {
        title,
        content,
      });

      setResult(response.data.suggestions);
    } catch (error) {
      console.error(error);
      alert("Error generating suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2>AI Blog Suggestions</h2>

      <input
        type="text"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <textarea
        placeholder="Enter blog content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={generateSuggestions} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Suggestions:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
