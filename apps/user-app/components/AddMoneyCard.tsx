"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState, useEffect } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "http://localhost:3000/hdfc"
}, {
    name: "Axis Bank",
    redirectUrl: "http://localhost:3000/axis"
}];

export const AddMoney = () => {
  
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    const [token, setToken] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (shouldRedirect && token && redirectUrl) {
            window.open(`${redirectUrl}?token=${token}&amount=${value}`, '_blank');
            setShouldRedirect(false);
        }
    }, [shouldRedirect, token, redirectUrl, value]);

    return <>
    <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setValue(Number(val))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>

       
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
              const response  = await createOnRampTransaction(provider, value)
             setToken(response?.token || "")
              if (response?.message){
                setToken(response.token || "")
                setShouldRedirect(true)
                }
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>


</>
}