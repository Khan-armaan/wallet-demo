import { Card } from "@repo/ui/card";
import getUserDetails from "@/app/lib/actions/getUserDetails";

export default async function DashboardPage() { 
    const userDetails = await getUserDetails()
    const userId = userDetails?.data?.id
    const email = userDetails?.data?.email
    const number = userDetails?.data?.number
    const name = userDetails?.data?.name

    return (
        <div className="container mx-auto p-6">
            <Card title="User Profile">
                <div className="space-y-4 text-gray-700">
                    <div>
                        <span className="font-semibold">Name:</span> {name || 'Not provided'}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {email || 'Not provided'}
                    </div>
                    <div>
                        <span className="font-semibold">Phone Number:</span> {number || 'Not provided'}
                    </div>
                    <div>
                        <span className="font-semibold">User ID:</span> {userId || 'Not available'}
                    </div>
                </div>
            </Card>
        </div>
    );
}
