'use client';

import { Card } from "@repo/ui/card";
import { useEffect, useState } from "react";
import getUserDetails from "@/app/lib/actions/getUserDetails";
import { Button } from "@repo/ui/button";
import getBalance from "@/app/lib/actions/getBalance";
import { BalanceCard } from "@/components/BalanceCard";

interface userDetails {
  id: number;
  email: string | null;
  name: string | null;
  number: string;
 
}

export default function DashboardPage() { 
    const [userDetails, setUserDetails] = useState<userDetails | null>()
    const [isLoading, setIsLoading] = useState(false)
    const [balance, setBalance] = useState(0)
    const [showBalance, setShowBalance] = useState(false)
    const [lockedBalance, setLockedBalance] = useState(0)
    

    async function onClickHandler(){
      setIsLoading(true)
      setShowBalance(true)
      const balance =  await getBalance()
      setBalance(balance.data?.amount || 0)
      setLockedBalance(balance.data?.locked || 0)
      setIsLoading(false)
    }
    
    
    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const details = await getUserDetails();
                setUserDetails(details.data);
            } catch (error) {
                console.error("Failed to fetch user details", error);
            }
        }

        fetchUserDetails();
    }, []);

    const userId = userDetails?.id;
    const email = userDetails?.email;
    const number = userDetails?.number;
    const name = userDetails?.name;

    return (
        <div className="container w-[400px] p-6">
            <Card title="User Profile" >
                <div className="space-y-4 text-gray-700 max-h-[400px] w-[300px] overflow-y-auto">
                    <div>
                        <span className="font-semibold">Name:</span> {name || 'Loading...'}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {email || 'Loading...'}
                    </div>
                    <div>
                        <span className="font-semibold">Phone Number:</span> {number || 'Loading...'}
                    </div>
                    <div>
                        <span className="font-semibold">User ID:</span> {userId || 'Loadng...'}
                    </div>
                </div>
            </Card>
          <div className="mt-5">
            <Button onClick={onClickHandler} disabled={isLoading}>{isLoading ? "Loading..." : "Get Balance"}</Button>
          </div>
          <div>{showBalance ? ( <BalanceCard amount={balance} locked={lockedBalance} ></BalanceCard>) : (null)}
           
          </div>
        </div>
    );
}
