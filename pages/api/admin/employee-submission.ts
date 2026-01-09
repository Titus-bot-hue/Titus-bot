import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
// In a real app validate the user session and role using NextAuth

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { type, payload } = req.body;
    // TODO: Validate payload, and attach user from session
    const submission = await prisma.employeeSubmission.create({
      data: {
        type: type || "general",
        payload: payload || {},
        // userId: ... set from authenticated session
      },
    });
    return res.status(201).json({ id: submission.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to create submission" });
  }
}
