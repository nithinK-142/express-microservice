import bcrypt from "bcrypt";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
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

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials!" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials!" });
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res
        .status(200)
        .json({ message: "Login successful", access_token: `Bearer ${token}` });
    } catch (error) {
      return res.status(500).json({ error: "An error occurred during login." });
    }
  }
}

export default AuthController;
