import express from "express"
import { editUser } from "../controllers/user.js";

const router = express.Router();

router.put("/edituser", editUser);


export default router;