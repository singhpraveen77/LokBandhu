import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const signup = async (req, res) => {
  try {
    const { username, email, password, role,department } = req.body;

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password,   // ⚠️ plain text (only for testing)
        role, 
        department,       // must match your Role enum
      },
    });


    return res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error creating user" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, role } = req.body;


    // 1️⃣ Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2️⃣ If user not found or role mismatch
    if (!user || user.role !== role) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or role",
      });
    }

    // 4️⃣ Success
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error logging in" });
  }
};

