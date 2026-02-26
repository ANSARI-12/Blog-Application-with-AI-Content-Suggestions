import { useState, useEffect } from "react";
import axios from "axios";

export default function BlogList({ onSelectBlog }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  if (loading) return <div style={styles.loading}>Loading blogs...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Blogs</h2>
      {blogs.length === 0 ? (
        <p style={styles.empty}>No blogs found. Create your first blog!</p>
      ) : (
        <div style={styles.list}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              style={styles.card}
              onClick={() => onSelectBlog(blog)}
            >
              <h3 style={styles.title}>{blog.title}</h3>
              <p style={styles.preview}>
                {blog.content.substring(0, 150)}
                {blog.content.length > 150 ? "..." : ""}
              </p>
              <div style={styles.footer}>
                <span style={styles.author}>By {blog.author}</span>
                <button
                  style={styles.deleteBtn}
                  onClick={(e) => deleteBlog(blog.id, e)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
    marginBottom: "20px",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#666",
  },
  empty: {
    textAlign: "center",
    color: "#666",
    padding: "40px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "box-shadow 0.2s",
    backgroundColor: "#fff",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#333",
  },
  preview: {
    color: "#666",
    marginBottom: "10px",
    lineHeight: "1.5",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {
    color: "#888",
    fontSize: "14px",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
