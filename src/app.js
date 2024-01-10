import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());

app.use("/v1",router)

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
