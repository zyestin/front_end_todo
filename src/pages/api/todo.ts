import { PrismaClient } from '@/generated/prisma';
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: '获取待办事项失败' });
      }
      break;

    case 'POST':
      try {
        const { text } = req.body;
        if (!text) {
          return res.status(400).json({ error: '待办事项内容不能为空' });
        }
        const todo = await prisma.todo.create({
          data: { text },
        });
        res.status(201).json(todo);
      } catch (error) {
        res.status(500).json({ error: '创建待办事项失败' });
      }
      break;

    case 'PUT':
      try {
        const { id, text, done } = req.body;
        if (!id) {
          return res.status(400).json({ error: '缺少待办事项ID' });
        }
        const todo = await prisma.todo.update({
          where: { id: Number(id) },
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
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ error: '缺少待办事项ID' });
        }
        await prisma.todo.delete({
          where: { id: Number(id) },
        });
        res.status(200).json({ message: '删除成功' });
      } catch (error) {
        res.status(500).json({ error: '删除待办事项失败' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`不支持 ${method} 方法`);
  }
}

