"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useToast } from "@/hooks/use-toast"

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const { toast } = useToast()

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button disabled={isLoading} onClick={async () => {
                            try {
                                setIsLoading(true);
                                const response = await p2pTransfer(number, Number(amount) * 100);
                                setResponse(response.message);
                                setIsSuccess(response.status);
                                
                                toast({
                                    variant: response.status ? "default" : "destructive",
                                    title: response.status ? "Success" : "Failed",
                                    description: response.message,
                                    duration: 3000, // Stay visible for 3 seconds
                                });
                            } catch (error) {
                                toast({
                                    variant: "destructive",
                                    title: "Error",
                                    description: "Something went wrong. Please try again.",
                                    duration: 3000,
                                });
                            } finally {
                                setIsLoading(false);
                            }
                        }}>{isLoading ? "Sending..." : "Send"}</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}