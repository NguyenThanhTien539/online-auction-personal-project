import express from "express";

const port = process.env.PORT || 3000;
const sever = express();

sever.get("/", (req, res) => {
  res.send("Hello World!");
});

sever.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
