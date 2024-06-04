import prisma from "../config/db.config.js";

class UserController {
  static async getUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found!!" });
      }

      return res.status(200).json({ message: "User found!!", user });
    } catch (error) {
      return res.status(404).json({ error: "User not found!!" });
    }
  }

  static async getUsers(req, res) {
    try {
      const { userIds } = req.body;

      const users = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(404).json({ error: "User not found!!" });
    }
  }
}

export default UserController;
