import { PrismaClient } from '@/generated/prisma';
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`不支持 ${req.method} 方法`);
  }

  try {
    const { done } = req.body;
    
    if (typeof done !== 'boolean') {
      return res.status(400).json({ error: 'done 参数必须是布尔值' });
    }

    const result = await prisma.todo.updateMany({
      data: { done },
    });

    res.status(200).json({ 
      message: `成功更新 ${result.count} 个待办事项`,
      updatedCount: result.count
    });
  } catch (error) {
    res.status(500).json({ error: '批量更新待办事项状态失败' });
  }
} 