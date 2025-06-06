// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@/generated/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  name: string;
};

const prisma = new PrismaClient();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  res.status(200).json({ name: "John Doe" });
}
