import { runAgents } from "../integration/agents.client.js";
import Hospital from "../models/Hospital.models.js";

export async function runHospitalAgents(req, res) {
  try {
    const {
      hospital_id,
      disease_sensitivity = 0.5,
      data,
      mode = "ensemble",
    } = req.body;

    if (!hospital_id || !Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // (Optional) Validate hospital exists
    const hospital = await Hospital.findOne({ id: hospital_id });
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    const agentPayload = {
      hospital_id,
      disease_sensitivity,
      data,
      mode,
    };

    const plan = await runAgents(agentPayload);

    return res.status(200).json({
      hospitalId: hospital_id,
      plan,
      source: "external-agent",
    });
  } catch (err) {
    console.error("Agent execution failed:", err.message);
    return res.status(500).json({
      error: "Agent execution failed",
      details: err.message,
    });
  }
}
