const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const http = require("https");
const { Server } = require("socket.io");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const SftpClient = require("ssh2-sftp-client");
const multer = require("multer")
const fs = require("fs");
const cookie = require("cookie-parser")
const jwt = require("jsonwebtoken");
app.use(cors({ origin: "https://casemate.icu",credentials: true })); // adjust your frontend URL in production
app.use(cookie())
app.use(express.json())
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/ws.casemate.icu/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/ws.casemate.icu/fullchain.pem"),
};
const server = http.createServer(sslOptions,app);
const genAI = new GoogleGenerativeAI("AIzaSyCE1dbOSUARJBlenNvlEuCINIVQqfuWdOA");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const upload = multer({storage: multer.memoryStorage()})
const io = new Server(server, {
  cors: { origin: "*" },
  transports: ["websocket", "polling"],  //  add polling
  path: "/socket.io/" // allow frontend to connect
});

let onlineUsers = {}; // userId -> socketId mapping
const db = mysql
  .createPool({
    host: "194.163.35.51",
    user: "u679703987_casemate",
    password: "u679703987_Casemate",
    database: "u679703987_casemate",
  })
  .promise();
const updatdb = async (query, elem) => {
  console.log(query, elem);

  try {
    await db.query(query, elem);
    return true;
  } catch (err) {
    console.error("DB Error:", err);
    return false;
  }
};
const sftp = new SftpClient();
async function sftpConnection(){
  try{

    await sftp.connect({
          host: "147.93.79.55",
          port: 65002,
          username: "u679703987",
          privateKey: fs.readFileSync("C:/Users/madha/.ssh/id_rsa"), // your key path
    });
    console.log("Connected SSH");
    
  }catch(err){
    console.log("err" ,err.message);
    if(err.message.contains("ECONNRESET")) return sftpConnection();
  }
}
sftpConnection();


async function authMiddleware(req,res,next) {
  console.log(req);
  
  const token = req.cookies?.token;
  if(!token) return res.status(401).json({error : "user not authenticated"})
  try {
    const user = jwt.verify(token,"helloworld");
    req.user = user
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({error : "User Not authenticated"})

  }
  next()
}
app.post("/upload", authMiddleware,upload.single("file"), async (req, res) => {
  const {file} = req 
  const {time,userId} = req.body
  const localPath = file.buffer;
  if(Number(userId) !== req.user.id) return res.status(403).json({error : "forbidden"})
  console.log(localPath,req);
  const type = file.originalname.split(".").pop();
  const originalName = file.originalname.replace(" ", '');
  const remotePath = `/home/u679703987/uploads/${userId}/${originalName}`;
  
  try {
    const exist = await sftp.exists(remotePath.substring(0,remotePath.lastIndexOf("/")))
    if(!exist) await sftp.mkdir(remotePath.substring(0,remotePath.lastIndexOf("/")))
    await sftp.put(localPath, remotePath);
    await updatdb("insert into files(filename,type,uploadType,userId,size,created_at) values (?,?,?,?,?,?)",[originalName,type,"default",Number(userId),file.size,time[0]])
    res.json({ success: true, message: "File uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
app.get("/download/:userId/:filename",authMiddleware, async (req, res) => {

  const filename = req.params.filename;
  const userId = req.params.userId;
  console.log(req.user.id,userId);
  
  if(Number(userId) !== req.user.id) return res.status(403).json({error : "forbidden"})
  const remotePath = `/home/u679703987//uploads/${userId}/${filename}`;
  const localPath = `./downloads/${filename}`;
  console.log("helo");
  
  try {
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "application/octet-stream");
      await sftp.get(remotePath,res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});
app.delete("/delete/:userId/:filename",authMiddleware, async (req, res) => {
  const {userId,filename} = req.params;
  console.log(req.params);
  
  const remotePath = `/home/u679703987/uploads/${userId}/${filename}`;
  if(Number(userId) !== req.user.id) return res.status(403).json({error : "forbidden"})
  try {
    await sftp.delete(remotePath);
    await updatdb("delete from files where userId = ? and filename = ?",[userId,filename])
    res.json({ success: true, message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
app.put("/rename", authMiddleware, async (req, res) => {
  console.log(req.body);
  const { oldName, newName,userId } = req.body;
  const oldPath = `/home/u679703987/uploads/${userId}/${oldName}`;
  const newPath = `/home/u679703987/uploads/${userId}/${newName}`;
  if(Number(userId) !== req.user.id) return res.status(403).json({error : "forbidden"})
  try {
    await sftp.rename(oldPath, newPath);
    await updatdb("update files set filename = ? where userId = ? and filename = ?",[newName,userId,oldName])
    res.json({ success: true, message: "File renamed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("register", async (userId) => {
    onlineUsers[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
    try {
      const [rows] = await db.query("SELECT * FROM chatbot WHERE userId = ?", [
        userId,
      ]);
      socket.emit("history", rows);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  });
  socket.on("chatMessage", async ({ userId, message, created_at, edit }) => {
    console.log(message);

    try {
      await updatdb(
        "INSERT INTO chatbot (text, role,userId, created_at) VALUES (?, ?, ?, ?)",
        [message, "user", userId, created_at]
      );
      const [rows] = await db.query(
        "SELECT * FROM chatbot WHERE userId = ? ORDER BY id desc limit 10",
        [userId]
      );
      const history = rows
        .map((m) => {
          return {
            role: m.role === "assistant" ? "model" : m.role,
            parts: [{ text: m.text }],
          };
        })
        .reverse();

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
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

`,
              },
            ],
          },
          ...history, // from DB, oldest → newest
        ],
      });
      const stream = await chat.sendMessageStream(message);

      let fullReply = "";

      for await (const chunk of stream.stream) {
        const text =
          typeof chunk.text === "function" ? chunk.text() : chunk.text;
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
      await updatdb(
        "INSERT INTO chatbot (text, role,userId, created_at) VALUES (?, ?, ?, ?)",
        [fullReply, "assistant", userId, created_at]
      );
    } catch (err) {
      console.error(err);
      socket.emit("error", { error: "Something went wrong" });
    }
  });
  socket.on("edit-message", async ({ id, message, userId }) => {
    try {
      console.log(id, message);

      await updatdb("update chatbot set text = ? where id = ?", [message, id]);
      const [rows] = await db.query(
        "SELECT * FROM chatbot WHERE userId = ? ORDER BY id desc limit 10",
        [userId]
      );
      const history = rows
        .map((m) => {
          return {
            role: m.role === "assistant" ? "model" : m.role,
            parts: [{ text: m.text }],
          };
        })
        .reverse();

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
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

`,
              },
            ],
          },
          ...history, // from DB, oldest → newest
        ],
      });
      const stream = await chat.sendMessageStream(message);

      let fullReply = "";

      for await (const chunk of stream.stream) {
        const text =
          typeof chunk.text === "function" ? chunk.text() : chunk.text;
        if (text) {
          console.log(text);
          fullReply += text;
          console.log("_".repeat(80));
        }
      }

      console.log("Final Reply:", fullReply);

      // const fullReply = (await stream.response).text();
      socket.emit("replyDone", { fullReply, edited: true, id: id + 1 });
      await updatdb("update chatbot set text = ? where id = ? ", [
        fullReply,
        id + 1,
      ]);
    } catch (err) {
      console.error(err);
      socket.emit("error", { error: "Something went wrong" });
    }
  });

  socket.on("continue-chat", async (msg) => {
    for (let i; i > msg.length; i++) {
      await updateDb(
        "INSERT INTO chatbot (text, role,userId, created_at) VALUES (?, ?, ?, ?)",
        [msg[i].text, msg[i].role, msg[i].userId, msg[i].created_at]
      );
    }
    socket.emit("route", { link: "/chatbot" });
    console.log("works shit hell");
  });
  // Handle sending messages
  socket.on("send-message", async (msg) => {
    // msg = { senderId, receiverId, content }
    console.log("Message received:", msg);
    await updateDb(
      "INSERT INTO chat (sender, receiver, message, created_at) VALUES (?, ?, ?, ?)",
      [msg.sender, msg.receiver, msg.message, msg.created_at]
    );
    // Forward to receiver if online
    const receiverSocket = onlineUsers[msg.receiver];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive-message", msg);
    }
  });
  socket.on("recent-message", async ({ sender, receiver }) => {
    try {
      console.log(sender, receiver);

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

server.listen(3001, "0.0.0.0", () => {
  console.log("Socket.IO server running on port 3001");
});
