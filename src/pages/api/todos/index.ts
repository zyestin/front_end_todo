import { PrismaClient } from '@/generated/prisma';
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const todos = await prisma.todo.findMany({
          orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: '获取待办事项列表失败' });
      }
      break;

    case 'POST':
      try {
        const { text } = req.body;
        
        if (!text || typeof text !== 'string' || text.trim() === '') {
          return res.status(400).json({ error: '待办事项内容不能为空' });
        }

        const todo = await prisma.todo.create({
          data: { text: text.trim() },
        });

        res.status(201).json(todo);
      } catch (error) {
        res.status(500).json({ error: '创建待办事项失败' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`不支持 ${req.method} 方法`);
  }
} 