import { Card } from "@repo/ui/card"

export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        user: string,
        sign: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions" >
        <div className="pt-2 pl-3 pr-3"  style={{ maxHeight: '400px',width: '600px', overflowY: 'auto' }}>
            {transactions
                .sort((a, b) => b.time.getTime() - a.time.getTime())
                .map(t => <div className="flex justify-between">
                    <div className="mb-3">
                        <div className="text-sm ">
                            {(t.sign === '+') ? "Received INR" : "Sent INR"}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                        <div className="text-slate-600 text-xs">
                         {(t.sign === '+') ? "from" : "to"}   {t.user}
                        </div>
                       
                    </div>
                    <div className="flex flex-col justify-center">
                        {t.sign} Rs {t.amount / 100}
                    </div>
                </div>)}
        </div>
    </Card>
}