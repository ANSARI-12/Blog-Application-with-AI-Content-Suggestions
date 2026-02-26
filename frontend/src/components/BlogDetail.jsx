import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function BlogDetail({ blog, onBack, onEdit }) {
  const [currentBlog, setCurrentBlog] = useState(blog);

  useEffect(() => {
    if (blog?.id) {
      fetchBlog(blog.id);
    }
  }, [blog?.id]);

  const fetchBlog = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs/${id}`);
      setCurrentBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const deleteBlog = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/${currentBlog.id}`);
      alert("Blog deleted successfully");
      onBack();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  if (!currentBlog) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={onBack}>
        ← Back to List
      </button>

      <article style={styles.article}>
        <h1 style={styles.title}>{currentBlog.title}</h1>

        <div style={styles.meta}>
          <span style={styles.author}>By {currentBlog.author}</span>
          {currentBlog.created_at && (
            <span style={styles.date}>
              {new Date(currentBlog.created_at).toLocaleDateString()}
            </span>
          )}
        </div>

        <div style={styles.content}>{currentBlog.content}</div>

        <div style={styles.actions}>
          <button style={styles.editBtn} onClick={() => onEdit(currentBlog)}>
            Edit
          </button>
          <button style={styles.deleteBtn} onClick={deleteBlog}>
            Delete
          </button>
        </div>
      </article>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
  },
  backBtn: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  article: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "32px",
    marginBottom: "15px",
    color: "#333",
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "1px solid #eee",
  },
  author: {
    color: "#666",
    fontWeight: "500",
  },
  date: {
    color: "#999",
  },
  content: {
    lineHeight: "1.8",
    color: "#333",
    whiteSpace: "pre-wrap",
  },
  actions: {
    marginTop: "30px",
    display: "flex",
    gap: "10px",
  },
  editBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
