import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2 pl-3 pr-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {transactions
                .sort((a, b) => b.time.getTime() - a.time.getTime())
                .map(t => <div className="flex justify-between">
                    <div className="mb-3">
                        <div className="text-sm ">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.status}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.provider}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs { t.amount ? (t.amount / 100).toFixed(2) : '0.00'}
                    </div>
                </div>)}
        </div>
    </Card>
}