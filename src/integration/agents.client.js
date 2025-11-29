import axios from "axios";

const AGENTS_API_URL = process.env.AGENTS_API_URL;

/**
 * Calls external AI agent system
 */
export async function runAgents(payload) {
  if (!AGENTS_API_URL) {
    throw new Error("AGENTS_API_URL not configured");
  }

  const res = await axios.post(`${AGENTS_API_URL}/agents/run`, payload, {
    timeout: 15000, // agents can be slow
  });

  if (!res.data || res.data.status !== "success") {
    throw new Error("Agent system failed");
  }

  return res.data.plan;
}
