import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const registerProblem = async (req, res) => {
  try {
    // Hardcoded problem for testing
    const newProblem = await prisma.problem.create({
      data: {
        images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        location: "Delhi, India",
        description: "Broken streetlight not working in the area.",
        voiceDescription: null,  // optional
        category: "Infrastructure",
        status: "PENDING",       // enum value
        priority: "HIGH",

        // Must connect the problem to an existing user
        user: {
          connect: { id: 1 }, // ⚡ change this to an actual User ID in your DB
        },
      },
    });

    return res.status(201).json({
      success: true,
      problem: newProblem,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error creating problem" });
  }
};

export default registerProblem;
