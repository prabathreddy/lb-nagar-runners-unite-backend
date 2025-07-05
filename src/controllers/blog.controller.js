import Blog from "../models/blog.model.js";

// Get all published blogs (optionally filter by category/tag)
export const getAllBlogs = async (req, res) => {
  try {
    const query = { status: "published" };
    if (req.query.category) query.category = req.query.category;
    if (req.query.tag) query.tags = req.query.tag;
    const blogs = await Blog.find(query).populate("author", "name");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};

// Get blog post by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    // Only allow published blogs for non-admins/authors
    if (blog.status !== "published" && (!req.user || (req.user.role !== "admin" && !blog.author.equals(req.user._id)))) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog", error: err.message });
  }
};

// Create new blog post (user)
export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user._id });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: "Blog creation failed", error: err.message });
  }
};

// Admin: Approve/publish blog post
export const approveBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: "published", publishedDate: new Date() },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Approval failed", error: err.message });
  }
};

// Update a blog post (author or admin)
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.equals(req.user._id) || req.user.role === "admin") {
      Object.assign(blog, req.body);
      await blog.save();
      res.json(blog);
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  } catch (err) {
    res.status(400).json({ message: "Blog update failed", error: err.message });
  }
};

// Delete a blog post (author or admin)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.equals(req.user._id) || req.user.role === "admin") {
      await blog.deleteOne();
      res.json({ message: "Blog post deleted" });
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};