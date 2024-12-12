"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function getBalance(){
    const session = await getServerSession(authOptions)
    const user_Id = parseInt(session?.user?.id as string)
    if(!user_Id){
        return {
            message: "User not found please login again",
            success: false
        }
    }
    try {
        const balance = await prisma.balance.findUnique({
            where: {
                userId: user_Id
            }
        })
        return{
            data: balance,
            success: true,
            message: "Balance fetched successfully"
        }
    } catch (error) {
        console.log(error)
        return{
            message: "Erro fetching balance",
            success: false 
        }
    }
}