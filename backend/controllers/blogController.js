const db = require("../models/blogModel");
exports.createBlog = (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: "All Fields required" });
  }
  const query = "INSERT INTO blogs(title,content,author)VALUES(?,?,?)";
  db.run(query, [title, content, author], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Blog created successfully",
      id: this.lastID,
    });
  });
};

exports.getBlogs = (req, res) => {
  db.all("SELECT * FROM blogs ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getBlogById = (req, res) => {
  db.get("SELECT * FROM blogs WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
};

exports.updateBlog = (req, res) => {
  const { title, content, author } = req.body;

  db.run(
    `UPDATE blogs SET title=?, content=?, author=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,
    [title, content, author, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Blog updated successfully" });
    }
  );
};

exports.deleteBlog = (req, res) => {
  db.run("DELETE FROM blogs WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Blog deleted successfully" });
  });
};
