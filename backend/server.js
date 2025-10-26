import express from "express";
import dotenv from "dotenv";
import twilio from "twilio";
import cors from "cors";

import fs from "fs";
dotenv.config();

const imageData = JSON.parse(fs.readFileSync("./staticData/imageData.json", "utf-8"));

console.log("image Data :",imageData);


const app = express();
const PORT = process.env.PORT || 5000;
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// Middleware
app.use(
  cors({
    origin:"*", 
    // credentials: true,               
  })
);
app.use(express.json());

// Test route
// app.get("/", (req, res) => {
//   res.send("🚀 Server is up and running!");
// });


//routes 
import userRoutes from "./routes/user.route.js"
import problemRoutes from "./routes/problem.route.js"
app.use("/api/users", userRoutes);
app.use("/api/problems", problemRoutes);


app.get("/",(req,res)=>{
  return res.send("// server is up ")
})



//sms service
app.post("/send-sms", async (req, res) => {
    
  // const messageText = `Complaint Registered
  //     Category: Infrastructure
  //     Reported by User: +919536xxxxxx
  //     Location:  Connaught Place, New Delhi, Delhi 110001, India
  //     Please take necessary action.`;
  // const phoneNumbers = process.env.phoneNumbers.split(",");
  // console.log("phone number :",phoneNumbers);
  
  const messageText = `🚨 Emergency Alert 🚨
A hazard has been reported near Marine Drive, Mumbai.
For your safety, please evacuate the area immediately and move towards designated safe zones.

✅ Emergency response teams and local authorities are already on the way to assist.
📞 For urgent help, please contact the disaster helpline at 1800-XXXX-XXXX.

Stay calm, follow official instructions, and help those in need. Your safety is our priority.`;
  const phoneNumbers = process.env.phoneNumbers.split(",");
  console.log("phone number :",phoneNumbers);
  
  try {
  
    for (const number of phoneNumbers) {
      const sms = await client.messages.create({
        body: messageText,
        from: process.env.TWILIO_PHONE, // your Twilio number
        to: number,
      })
      console.log("send to :",number);


    }

    res.json({ success: true, sid: sms.sid });
    console.log("backend sent");
    
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


//auto generation description !!
app.post("/api/generate-description", (req, res) => {
  const { imageName } = req.body;

  if (!imageData[imageName]) {
    return res.status(404).json({ error: "Image data not found" });
  }

  const { category, descriptions } = imageData[imageName];
  const randomDescription =
    descriptions[Math.floor(Math.random() * descriptions.length)];

  res.json({
    imageName,
    category,
    description: randomDescription,
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
