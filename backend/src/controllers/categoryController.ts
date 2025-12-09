import { Request, Response } from "express";
import prisma from "../prisma/client.ts";

export async function getAllCategories(req: Request, res: Response) {
   const categories= await prisma.itemCategory.findMany();
   res.json(categories);
}

export async function getCategoryById(req: Request, res: Response){
    const id = parseInt( req.params.id)
    const category = await prisma.itemCategory.findUnique({where: {id}})
    if(!category) return res.status(404).json("category not found")
    res.json(category);
}

export async function createCategory(req: Request, res:Response){
    const {name}=  req.body;
    const category= await prisma.itemCategory.create({
    data: { name },
   })
   res.status(201).json(category)

}

export async function updateCategory(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const { name } = req.body
  const category = await prisma.itemCategory.update({
    where: { id },
    data: { name },
  })
  res.json(category)
}

export async function deleteCategory(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  await prisma.itemCategory.delete({ where: { id } })
  res.status(204).send()
}