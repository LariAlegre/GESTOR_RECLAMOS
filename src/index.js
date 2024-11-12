import validateContentType from "./middleware/validateContentType.js";
import initModules from "./module/module.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(validateContentType);

initModules(app);

app.listen(PORT);
console.log(`Listening on port ${PORT}`);