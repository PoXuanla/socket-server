// import library
const express = require("express");
const ServerSocket = require("ws").Server; // 引用 Server

// 指定一個 port
const PORT = 8080;

// 建立 express 物件並用來監聽 8080 port
const server = express().listen(PORT, () =>
  console.log(`[Server] Listening on https://localhost:${PORT}`)
);

// 建立實體，透過 ServerSocket 開啟 WebSocket 的服務
const wss = new ServerSocket({ server });

// Connection opened
wss.on("connection", (ws) => {
  console.log("[Client connected]");

  // Listen for messages from client
  ws.on("message", (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    let clients = wss.clients;
    console.log("clients", clients);
    console.log("[Message from client]: ", message);
    // Send message to client
    ws.send("[Get message from server]");
  });

  // Connection closed
  ws.on("close", () => {
    console.log("Close connected");
  });
});
