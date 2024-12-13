import express from "express";
import db from "@repo/db/client";
import z from "zod";
const app = express();
app.use(express.json())


import cors from 'cors';


app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
}));

app.post("/hdfcWebhook", async (req, res) => {
 
    const paymentInformationSchema = z.object({
        token: z.string(),
        userId: z.string(),
        amount: z.string()        
    })
   



    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };



  const reseult =  paymentInformationSchema.safeParse(paymentInformation)
  if (!reseult){
    return res.json({
        message: "invalid inforamation",
        success: false
    })
  }
    try {
        const balance = await db.balance.findUnique({
            where: {
                userId: Number(paymentInformation.userId)
            }
        })
        if (!balance){
           await db.balance.create({
            data: {
                userId: Number(paymentInformation.userId),
                amount: 0,
                locked: 0
            }
           })
        }
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                     
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Transaction Successfull",
            success: true
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing ",
            success : false
        })
    }

})

app.listen(3003);