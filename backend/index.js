const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const authRoutes = require("./auth");
const socialRoutes = require("./social");
const profileRoutes = require("./profile");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());  // You can configure CORS here if needed

// Mount the routes
app.use("/api/auth", authRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/account", profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
