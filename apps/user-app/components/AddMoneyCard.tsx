"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { useRouter } from 'next/navigation';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "/HdfcPage"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const router = useRouter();
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    const [token, setToken] = useState("")



    const handleRedirect = (url: string) => {
      
        if (url.startsWith('/')) {
            router.push(`${url}?token=${token}&amount=${value}`);  // Pass token and amount as query params
        } else {
            // For external URLs, continue using window.open
            window.open(url, '_blank');
        }
    };
      
      
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
              setToken(response.token || "")
              handleRedirect(redirectUrl || "")
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
<div className=" mt-4"><Card title="token" >
    <div className="text-center mt-5">
        {token}
    </div>
</Card></div>

</>
}