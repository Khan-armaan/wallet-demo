import express from "express";
import db from "@repo/db/client";
import z from "zod";
const app = express();

app.use(express.json())

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
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
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
            message: "Captured",
            success: true
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);