import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest){
    const { email, name, number, password } = await req.json() //request in a json format 
    try {

    
     const existingNumber = await prisma.user.findUnique({
        where: {
            number: number
        }
     })
     if(existingNumber){
        return NextResponse.json({
            message: 'Number already exists',
            success: false,
            data: null
        }, {status: 400})   //status 400 that is user not found
     }

     const existingEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
     })
     if(existingEmail){
        return NextResponse.json({
            message: 'Email already exists',
            success: false,
            data: null
        }, {status: 400})
     }

    const hashedPassword = await bcrypt.hash(password, 10)

    const response = await prisma.user.create({
            data: {
                email: email,
                name: name,
                number: number,
                password: hashedPassword
            }
        })
        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            data: response
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: 'User creation failed',
            success: false,
            error: error
        }, {status: 500})
    } 
  

}