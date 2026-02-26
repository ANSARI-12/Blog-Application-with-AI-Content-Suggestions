import { useState } from "react";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import WriteBlog from "./components/WriteBlog";
import AiSuggestions from "./components/AiSuggestions";

function App() {
  const [currentView, setCurrentView] = useState("list");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogToEdit, setBlogToEdit] = useState(null);

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    setCurrentView("detail");
  };

  const handleBack = () => {
    setSelectedBlog(null);
    setBlogToEdit(null);
    setCurrentView("list");
  };

  const handleEdit = (blog) => {
    setBlogToEdit(blog);
    setCurrentView("write");
  };

  const handleSave = () => {
    setBlogToEdit(null);
    setCurrentView("list");
  };

  const handleNewBlog = () => {
    setBlogToEdit(null);
    setCurrentView("write");
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title} onClick={handleBack}>
          Blog App
        </h1>
        <nav style={styles.nav}>
          <button style={styles.navBtn} onClick={() => setCurrentView("list")}>
            All Blogs
          </button>
          <button style={styles.navBtn} onClick={handleNewBlog}>
            Write Blog
          </button>
          <button style={styles.navBtn} onClick={() => setCurrentView("ai")}>
            AI Suggestions
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        {currentView === "list" && <BlogList onSelectBlog={handleSelectBlog} />}
        {currentView === "detail" && selectedBlog && (
          <BlogDetail
            blog={selectedBlog}
            onBack={handleBack}
            onEdit={handleEdit}
          />
        )}
        {currentView === "write" && (
          <WriteBlog
            blogToEdit={blogToEdit}
            onSave={handleSave}
            onCancel={handleBack}
          />
        )}
        {currentView === "ai" && <AiSuggestions />}
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#333",
    color: "white",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    cursor: "pointer",
    fontSize: "24px",
  },
  nav: {
    display: "flex",
    gap: "10px",
  },
  navBtn: {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  main: {
    padding: "20px",
  },
};

export default App;
