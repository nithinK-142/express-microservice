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
}

export default UserController;
