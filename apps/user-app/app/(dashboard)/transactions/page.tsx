import { authOptions } from "@/app/lib/auth";
import { P2pTransactions } from "@/components/P2pTransactions";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import React from 'react';

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
        .sort((a: { time: string | number | Date; }, b: { time: string | number | Date; }) => new Date(a.time).getTime() - new Date(b.time).getTime()); // Sort transactions by start time
}

async function getCombinedP2pTransactions() {
    const session = await getServerSession(authOptions);
    const incomingTxns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        },
        include: {
            fromUser: true // Include fromUser details
        }
    });

    const outgoingTxns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        },
        include: {
            toUser: true // Include toUser details
        }
    });

    const combinedTxns = [
        ...incomingTxns.map((t: any) => ({
            time: t.timestamp,
            amount: t.amount,
            user: t.fromUser.name,
            sign: '+', // Incoming transaction
        })),
        ...outgoingTxns.map((t: any) => ({
            time: t.timestamp,
            amount: t.amount,
            user: t.toUser.name,
            sign: '-', // Outgoing transaction
        }))
    ].sort((a: { time: string | number | Date; }, b: { time: string | number | Date; }) => new Date(a.time).getTime() - new Date(b.time).getTime()); // Sort transactions by timestamp

    return combinedTxns;
}

export default async function TransferPage() {
    const p2pTransactions = await getCombinedP2pTransactions();
    return (
        <div>
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transactions
            </div>
           <P2pTransactions transactions={p2pTransactions} />
        </div>
    );
}