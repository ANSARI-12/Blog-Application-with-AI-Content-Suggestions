const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const aiController = require("../controllers/aiController");

router.post("/blogs", blogController.createBlog);
router.get("/blogs", blogController.getBlogs);
router.get("/blogs/:id", blogController.getBlogById);
router.put("/blogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlog);

router.post("/ai-suggestions", aiController.getAiSuggestions);

module.exports = router;
