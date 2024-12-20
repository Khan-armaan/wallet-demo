import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

interface Transaction {
  time: string;
  provider: string;
  amount: number;
  status: string
  // add other properties as needed
}

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns
        .map((t: any) => ({  // there will be multiple onRamp transactions for a single user
            time: t.startTime,
            amount: t.amount,
            status: t.status,
            provider: t.provider
        }))
        .sort((a: Transaction, b: Transaction) => new Date(a.time).getTime() - new Date(b.time).getTime()); // Sort transactions by start time
}

export default async function() {

    const transactions = await getOnRampTransactions();
    
    const sortedTransactions = transactions
      .map((t: any): any => ({
        time: t.time,
        provider: t.provider,
        amount: t.amount,
        status: t.status
      }))
      .sort((a: Transaction, b: Transaction) => 
        new Date(a.time).getTime() - new Date(b.time).getTime()
      );

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
             
                <div>
                    <OnRampTransactions transactions={sortedTransactions} />
                </div>
            </div>
        </div>
    </div>
}