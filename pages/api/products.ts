import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // list public products
      const products = await prisma.product.findMany({
        where: { active: true },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          priceCents: true,
          currency: true,
          inventory: true,
          images: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      // create product (should be protected in real app)
      const { title, slug, description, priceCents, currency, inventory, images } = req.body;
      if (!title || !slug || !priceCents) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const product = await prisma.product.create({
        data: { title, slug, description, priceCents, currency: currency || "USD", inventory: inventory || 0, images: images || [] },
      });
      return res.status(201).json(product);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal error" });
  } finally {
    // Prisma client will be reused across requests in Next.js dev. Avoid disconnect in production runtime.
  }
}
