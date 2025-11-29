import express from "express";
import { runHospitalAgents } from "../controllers/agents.controller.js";

const router = express.Router();

router.post("/agents/run", runHospitalAgents);

export default router;
