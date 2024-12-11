"use client"
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast"
import axios  from 'axios';

interface ApiResponse {
  message: string;
  success: boolean;
}

export default function HdfcPage() {
    const searchParams = useSearchParams();
    const [userId, setUserId] = useState('');
    const [responseMsg, setResponseMsg] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    
    const token = searchParams.get('token') || '';
    const amount = searchParams.get('amount') || '';
    const actualAmount = Number(amount) * 100
    useEffect(() => {
        setTimestamp(Date.now().toString());
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await axios.post<ApiResponse>(
                'http://localhost:3003/hdfcWebhook', 
                {
                    token: token,
                    user_identifier: userId,
                    amount: actualAmount.toString()
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    withCredentials: true
                }
            );
            setResponseMsg(response.data.message);
            toast({
                title: response.data.message,
                description: timestamp,
            });
            if (response.data.success) {
                window.location.href = 'http://localhost:3001';
            }
        } catch (error) {
            if (error){
                console.error("axios error")
                toast({
                    title: 'Network Error',
                    description: `Failed to connec to the server ${error}`
                })
            }
             else {
                console.error('Error:', error);
                toast({
                    title: "Error occurred",
                    description: "Failed to process the transaction",
                    variant: "destructive"
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">HDFC Bank Transaction</h1>
            </div>

            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl mb-6">Transaction Details</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                            User ID
                        </label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter User ID"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                            ₹{amount}
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md transition-colors ${
                            isLoading 
                            ? 'bg-blue-300 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                    >
                        {isLoading ? (<span>Processing...</span>) : (<span>Continue</span>)}
                    </button>
                </form>

                <div className="mt-6 text-sm text-gray-600 flex items-center justify-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Your security is of utmost importance
                </div>
            </div>
        </div>
    );
}