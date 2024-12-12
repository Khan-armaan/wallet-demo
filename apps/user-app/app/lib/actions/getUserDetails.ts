"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export default async function getUserDetails(){
    const session = await getServerSession(authOptions)
    const userId = parseInt(session?.user?.id as string)
    if (!userId){
        return {
            message: "User not found please login again",
            success: false
        }
    }
    try {
        const userInfo = await prisma.user.findUnique({
            where: {
                id : userId
            }
        })
       
        return {
            message: "User details fetched successfully",
            success: true,
            data: userInfo
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Error while fetching the user detials",
            success: false 
        }
    }
   
}