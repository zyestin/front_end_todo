import { PrismaClient } from '@/generated/prisma';
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`不支持 ${req.method} 方法`);
  }

  try {
    const result = await prisma.todo.deleteMany({
      where: { done: true },
    });

    res.status(200).json({ 
      message: `成功删除 ${result.count} 个已完成待办事项`,
      deletedCount: result.count
    });
  } catch (error) {
    res.status(500).json({ error: '清除已完成待办事项失败' });
  }
} 