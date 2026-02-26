import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function WriteBlog({ blogToEdit, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
      setAuthor(blogToEdit.author);
    }
  }, [blogToEdit]);

  const handleGetAiSuggestions = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content to get AI suggestions");
      return;
    }

    try {
      setAiLoading(true);
      const response = await axios.post(`${API_URL}/api/ai-suggestions`, {
        title,
        content,
      });
      setAiSuggestions(response.data.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
      alert("Failed to get AI suggestions. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleInsertSuggestions = () => {
    const currentContent = content ? content + "\n\n" : "";
    setContent(currentContent + aiSuggestions);
    setShowSuggestions(false);
    setAiSuggestions("");
  };

  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
    setAiSuggestions("");
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!author.trim()) newErrors.author = "Author is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (blogToEdit) {
        await axios.put(`${API_URL}/api/blogs/${blogToEdit.id}`, {
          title,
          content,
          author,
        });
        alert("Blog updated successfully!");
      } else {
        await axios.post(`${API_URL}/api/blogs`, {
          title,
          content,
          author,
        });
        alert("Blog created successfully!");
      }
      onSave();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        {blogToEdit ? "Edit Blog" : "Write a New Blog"}
      </h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={
              errors.title
                ? { ...styles.input, borderColor: "red" }
                : styles.input
            }
            placeholder="Enter blog title"
          />
          {errors.title && <span style={styles.error}>{errors.title}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={
              errors.author
                ? { ...styles.input, borderColor: "red" }
                : styles.input
            }
            placeholder="Enter author name"
          />
          {errors.author && <span style={styles.error}>{errors.author}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={
              errors.content
                ? { ...styles.textarea, borderColor: "red" }
                : styles.textarea
            }
            placeholder="Write your blog content here..."
            rows="10"
          />
          {errors.content && <span style={styles.error}>{errors.content}</span>}

          <button
            type="button"
            style={styles.aiBtn}
            onClick={handleGetAiSuggestions}
            disabled={aiLoading}
          >
            {aiLoading ? "Getting Suggestions..." : "Get AI Suggestions"}
          </button>

          {showSuggestions && (
            <div style={styles.suggestionsBox}>
              <div style={styles.suggestionsHeader}>
                <h4 style={{ margin: 0 }}>AI Suggestions</h4>
                <button
                  type="button"
                  style={styles.closeBtn}
                  onClick={handleCloseSuggestions}
                >
                  ✕
                </button>
              </div>
              <p style={styles.suggestionsText}>{aiSuggestions}</p>
              <button
                type="button"
                style={styles.insertBtn}
                onClick={handleInsertSuggestions}
              >
                Insert Suggestions
              </button>
            </div>
          )}
        </div>

        <div style={styles.actions}>
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading
              ? "Saving..."
              : blogToEdit
              ? "Update Blog"
              : "Publish Blog"}
          </button>
          <button type="button" style={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    fontFamily: "inherit",
    resize: "vertical",
    boxSizing: "border-box",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
    display: "block",
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  submitBtn: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  cancelBtn: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  aiBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
  },
  suggestionsBox: {
    marginTop: "15px",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  suggestionsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#666",
  },
  suggestionsText: {
    margin: "10px 0",
    lineHeight: "1.6",
    color: "#333",
  },
  insertBtn: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
