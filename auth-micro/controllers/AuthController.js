import bcrypt from "bcrypt";
import prisma from "../config/db.config.js";

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error while creating user!!" });
    }
  }
}

export default AuthController;
