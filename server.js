// server.js (add this line after io initialization)
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

// Socket.IO setup
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Make io accessible to routes
app.set('io', io);

// Existing routes
const contactRoute = require("./routes/contactroutes");
const blogRoute = require("./routes/blogroutes");
const freeQuoteRoute = require("./routes/freeQuoteroutes");
const requestRoute = require('./routes/requestroutes');

app.use("/contact", contactRoute);
app.use("/allblogs", blogRoute);
app.use("/freequote", freeQuoteRoute);
app.use("/request", requestRoute);
app.use('/uploads', express.static('uploads'));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongodb err", err));

// Socket.IO events for real-time chat
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chatMessage", async (msg) => {
    try {
      console.log("Message received:", msg);
      
      // Save to database
      const FreeQuote = require('./models/freeQuote');
      const newMessage = new FreeQuote({
        name: msg.username,
        message: msg.message
      });
      const savedMessage = await newMessage.save();
      
      // Broadcast to all clients
      io.emit("chatMessage", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Use http server instead of app.listen
http.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT || 5000);
});