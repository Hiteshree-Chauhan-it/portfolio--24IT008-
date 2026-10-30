import express from "express";

const router = express.Router();

// Simple in-memory rate limiter: maximum 10 requests per minute per IP address
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

const rateLimiter = (req, res, next) => {
  const clientIp = req.ip || req.connection.remoteAddress || "client";
  const now = Date.now();

  const clientData = requestCounts.get(clientIp) || { count: 0, startTime: now };

  // Reset window if expired
  if (now - clientData.startTime > RATE_LIMIT_WINDOW_MS) {
    clientData.count = 1;
    clientData.startTime = now;
  } else {
    clientData.count += 1;
  }

  requestCounts.set(clientIp, clientData);

  if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      message: "Too many AI generation requests. Please wait a minute and try again.",
    });
  }

  next();
};

/**
 * POST /api/ai/generate-description
 * Body: { title: "Complete college practical" }
 */
router.post("/generate-description", rateLimiter, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required to generate a description.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured in backend .env file.",
        fallback: `Plan and execute the task: "${title.trim()}". Review requirements, prepare checklist, and complete deliverables on time.`,
      });
    }

    // Call Google Gemini API (gemini-flash-latest) using standard HTTPS fetch
    const prompt = `You are a helpful task management assistant. Given the task title "${title.trim()}", write a concise, actionable, 1-2 sentence description for this task. Do not include markdown formatting or quotes, just the plain text description.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 100,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("[AI API Error]:", data);
      return res.status(502).json({
        success: false,
        message: data.error?.message || "Failed to generate description from AI service.",
        fallback: `Plan and execute the task: "${title.trim()}". Review requirements, prepare checklist, and complete deliverables on time.`,
      });
    }

    // Extract text from Gemini response structure
    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!generatedText) {
      return res.status(200).json({
        success: true,
        description: `Plan and execute the task: "${title.trim()}". Review requirements and complete deliverables on time.`,
        disclaimer: "AI-generated suggestion. Please review before using.",
      });
    }

    return res.status(200).json({
      success: true,
      description: generatedText,
      disclaimer: "AI-generated suggestion. Please review before using.",
    });
  } catch (error) {
    console.error("[AI Route Exception]:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while connecting to AI service.",
      fallback: `Plan and execute the task: "${req.body?.title || "new task"}". Check deliverables and verify completion.`,
    });
  }
});

export default router;
