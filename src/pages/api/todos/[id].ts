import { PrismaClient } from '@/generated/prisma';
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const todoId = Number(id);

  if (isNaN(todoId)) {
    return res.status(400).json({ error: '无效的待办事项ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const todo = await prisma.todo.findUnique({
          where: { id: todoId },
        });

        if (!todo) {
          return res.status(404).json({ error: '待办事项不存在' });
        }

        res.status(200).json(todo);
      } catch (error) {
        res.status(500).json({ error: '获取待办事项详情失败' });
      }
      break;

    case 'PUT':
    case 'PATCH':
      try {
        const { text, done } = req.body;
        
        const todo = await prisma.todo.update({
          where: { id: todoId },
          data: { 
            ...(text !== undefined && { text }),
            ...(done !== undefined && { done }),
          },
        });

        res.status(200).json(todo);
      } catch (error) {
        res.status(500).json({ error: '更新待办事项失败' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.todo.delete({
          where: { id: todoId },
        });

        res.status(200).json({ message: '删除成功' });
      } catch (error) {
        res.status(500).json({ error: '删除待办事项失败' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
      res.status(405).end(`不支持 ${req.method} 方法`);
  }
} 