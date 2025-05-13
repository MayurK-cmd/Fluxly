const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const { authenticate } = require("./middleware"); // Import the authenticate middleware

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


// POST /profile - Add or update profile picture and bio
router.post("/profile", authenticate, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized. User ID not found in token." });
  }

  const { profilepic, bio } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        profilepic: profilepic || undefined,
        bio: bio || undefined,
      },
    });

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// GET /profile - Retrieve profile data
router.get("/profile", authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        profilepic: true,
        socialLinks: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve profile" });
  }
});

// DELETE /profile - Delete account after verifying password
router.delete("/profile", authenticate, async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    
    await prisma.links.deleteMany({
      where: { userId },
    });

  
    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error.message, error.stack);
    res.status(500).json({ error: "Failed to delete account" });
  }
});



// PATCH /profile - Edit only bio or profile picture
router.patch("/profile", authenticate, async (req, res) => {
  const userId = req.userId;
  const { profilepic, bio } = req.body;

  if (!profilepic && !bio) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        profilepic: profilepic || undefined,
        bio: bio || undefined,
      },
    });

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});


module.exports = router;