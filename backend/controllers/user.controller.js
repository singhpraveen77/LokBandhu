import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const signup = async (req, res) => {
  try {
    // const { name, email, password, role } = req.body;

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: "Praveen Singh",
        email: "praveen@example.com",
        password: "test1234",   // ⚠️ plain text (only for testing)
        role: "CITIZEN",        // must match your Role enum
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

export default signup;
