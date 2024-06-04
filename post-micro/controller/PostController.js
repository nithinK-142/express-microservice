import prisma from "../config/db.config.js";

class PostController {
  static async index(req, res) {
    try {
      const posts = await prisma.post.findMany({});
      return res.status(200).json({ posts });
    } catch (error) {
      return res.status(500).json({ error: "Post not found" });
    }
  }

  static async store(req, res) {
    try {
      const authUser = req.user;
      const { title, content } = req.body;
      const post = await prisma.post.create({
        data: {
          userId: authUser.id,
          title,
          content,
        },
      });

      return res
        .status(200)
        .json({ message: "Post created successfully", post });
    } catch (error) {}
  }
}

export default PostController;
