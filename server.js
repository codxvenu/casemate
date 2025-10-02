const { GoogleGenerativeAI } = require("@google/generative-ai"); 
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mysql = require("mysql2")
const app = express();

app.use(cors({ origin: "*" })); // adjust your frontend URL in production

const server = http.createServer(app);
const genAI = new GoogleGenerativeAI("AIzaSyCE1dbOSUARJBlenNvlEuCINIVQqfuWdOA");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const io = new Server(server, {
  cors: { origin: "*" }, // allow frontend to connect
});
let onlineUsers = {}; // userId -> socketId mapping
const db = mysql.createPool({
     host : "194.163.35.51",
    user : "u679703987_casemate",
    password:"u679703987_Casemate",
    database : "u679703987_casemate"
}).promise(); 
const updateDb = async ({ sender, receiver, message ,created_at}) => {
  try {
    await db.query(
      "INSERT INTO chat (sender, receiver, message, created_at) VALUES (?, ?, ?, ?)",
      [sender, receiver, message,created_at]
    );
    return true;
  } catch (err) {
    console.error("DB Error:", err);
    return false;
  }
};
const updateAiDb = async ({ text, role,userId,created_at}) => {
  try {
    await db.query(
      "INSERT INTO chatbot (text, role,userId, created_at) VALUES (?, ?, ?, ?)",
      [text, role, userId,created_at]
    );
    return true;
  } catch (err) {
    console.error("DB Error:", err);
    return false;
  }
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("register", async(userId) => {
    onlineUsers[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
     try {
      const [rows] = await db.query("SELECT * FROM chatbot WHERE userId = ?", [userId]);
      socket.emit("history", rows);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
});
    socket.on("chatMessage", async ({ userId, message , created_at}) => {
      console.log(message);
      
    try {
      await updateAiDb({role : "user",text : message,userId,created_at})
      const [rows] = await db.query("SELECT * FROM chatbot WHERE userId = ? ORDER BY id desc limit 10", [userId]);
      const history = rows.map((m)=>{
return {role : m.role === "assistant" ? "model" : m.role , parts :[ {text : m.text}]}
      }).reverse(); 

      
      console.log(history[0].role === "model" ? history.slice(1,) : history);
      
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{
        text: `You are CaseMate AI, a professional legal research assistant for lawyers.  

- Your primary role is legal research, document summarization, case analysis, and data management for lawyers.  
- Answer fully and clearly for questions directly related to law, regulations, or legal practice.  
- If a question is outside law but may affect legal practice (e.g., politics, economy, regulations, technology), provide a brief summary and relate it to potential legal implications.  
- If a question is entirely unrelated to law (e.g., gossip, sports, astrophysics), politely decline and redirect to legal topics.  
- Use available user data (e.g., past 5 messages from chat history or uploaded documents) to improve context and relevance.  
- Provide structured, concise, and professional responses.  
- When appropriate, include bullet points, numbered lists, or summaries to make information easy to digest.  
- Maintain a polite, professional tone at all times, ensuring responses are suitable for lawyers.  
- Avoid giving opinions or facts outside your verified legal knowledge.  
- if the question asked of general knowledge try to answer it but keep in mind to avoid any legal issue.

`
      }]
    },
    ...history  // from DB, oldest → newest
  ]
});
const stream = await chat.sendMessageStream(message);

let fullReply = "";

for await (const chunk of stream.stream) {
  const text = typeof chunk.text === "function" ? chunk.text() : chunk.text;
  if (text) {
    console.log(text);
    fullReply += text;
    socket.emit("replyChunk", { text });
    console.log("_".repeat(80));
  }
}

console.log("Final Reply:", fullReply);

      // const fullReply = (await stream.response).text();
      socket.emit("replyDone", { fullReply });
      await updateAiDb({role : "assistant",text : fullReply,userId,created_at})
    } catch (err) {
      console.error(err);
      socket.emit("error", { error: "Something went wrong" });
    }
  });

  

  // Handle sending messages
  socket.on("send-message", async(msg) => {
    // msg = { senderId, receiverId, content }
    console.log("Message received:", msg);
    await updateDb(msg)
    // Forward to receiver if online
    const receiverSocket = onlineUsers[msg.receiver];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive-message", msg);
    }
  });
  socket.on("recent-message", async ({ sender, receiver }) => {
  try {
    console.log(sender,receiver);
    
    // fetch messages sent from sender → receiver
    const [rows1] = await db.query(
      "SELECT * FROM chat WHERE sender = ? AND receiver = ?",
      [sender, receiver]
    );

    // fetch messages sent from receiver → sender
    const [rows2] = await db.query(
      "SELECT * FROM chat WHERE sender = ? AND receiver = ?",
      [receiver, sender]
    );

    // combine and sort by created_at
    const allMessages = [...rows1, ...rows2].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    // send only to this socket
    socket.emit("receive-recent-message", allMessages);
  } catch (err) {
    console.error("DB error:", err);
  }
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const [uid, sid] of Object.entries(onlineUsers)) {
      if (sid === socket.id) {
        delete onlineUsers[uid];
        break;
      }
    }
  });
});

server.listen(3001,"0.0.0.0", () => {
  console.log("Socket.IO server running on port 3001");
});
