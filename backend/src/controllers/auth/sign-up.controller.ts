import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../utils/prisma";
import { Exact } from "@prisma/client/runtime/library";
const checkout = (res: Response, req: Request) => {};

export const signUp = async (req: Request, res: Response) => {
  const {
    email,
    password,
    username,
  }: { email: string; password: string; username: string } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const response = await prisma.user.create({
      data: {
        name: username,
        email,
        hashedPassword: hashedPassword,
      },
    });
    return res.send({
      success: true,
      message: response,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
};
