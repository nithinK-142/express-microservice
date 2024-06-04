import prisma from "../config/db.config.js";
import axios from "axios";

class PostController {
  static async index(req, res) {
    try {
      const posts = await prisma.post.findMany({});

      let userIds = [];
      posts.forEach((post) => userIds.push(post.userId));

      const response = await axios.post(
        `${process.env.AUTH_MICRO_URL}/api/getUsers`,
        userIds
      );

      // let postWithUsers = await Promise.all(
      //   posts.map(async (post) => {
      //     const user = await response.data.users.find((item) => item.id === post.userId);
      //     return {
      //       ...post,
      //       user,
      //     };
      //   })
      // );

      const users = {};
      response.data.users.forEach((user) => (users[user.id] = user));

      let postWithUsers = await Promise.all(
        posts.map((post) => {
          const user = users[post.userId];
          return {
            ...post,
            user,
          };
        })
      );

      return res.status(200).json({ postWithUsers });
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
