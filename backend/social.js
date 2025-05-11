const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { authenticate } = require("./middleware"); // Import the authenticate middleware

const prisma = new PrismaClient();
const router = express.Router();

// Add a new social platform (e.g., Twitter, Facebook, etc.)
router.post("/addPlatform", authenticate, async (req, res) => {
  const { platform, url } = req.body;

  if (!platform || !url) {
    return res.status(400).json({ message: "Platform and URL are required" });
  }

  try {
    const socialLink = await prisma.links.create({
      data: {
        platform,   // The name of the social platform (Twitter, Facebook, etc.)
        url,        // The URL of the user's profile on the platform
        userId: req.user.userId,  // Using the authenticated user's ID from the token
      },
    });

    res.status(201).json({ message: "Social platform added successfully", socialLink });
  } catch (err) {
    console.error("Error adding social platform:", err);
    res.status(500).json({ message: "Error adding social platform" });
  }
});

// Get all social platforms linked to the authenticated user
router.get("/getPlatforms", authenticate, async (req, res) => {
  try {
    const platforms = await prisma.links.findMany({
      where: { userId: req.user.userId }, // Fetch links for the authenticated user
    });

    res.json({ platforms });
  } catch (err) {
    console.error("Error fetching platforms:", err);
    res.status(500).json({ message: "Error fetching platforms" });
  }
});

// Delete a social platform link
router.delete("/deletePlatform", authenticate, async (req, res) => {
  const { platformId } = req.body;

  if (!platformId) {
    return res.status(400).json({ message: "Platform ID is required" });
  }

  try {
    const link = await prisma.links.delete({
      where: { id: platformId },
    });

    res.json({ message: "Social platform deleted successfully", link });
  } catch (err) {
    console.error("Error deleting platform:", err);
    res.status(500).json({ message: "Error deleting platform" });
  }
});

module.exports = router;
