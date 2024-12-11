"use client"
import { useSearchParams } from 'next/navigation';

export default function HdfcPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const amount = searchParams.get('amount');

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">HDFC Bank Transaction</h1>
            </div>

            {/* Main Form Container */}
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl mb-6">Transaction Details</h2>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                            User ID
                        </label>
                        <input
                            type="text"
                            id="userId"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter User ID"
                        />
                    </div>

                    <div>
                        <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                            Token
                        </label>
                        <input
                            type="text"
                            id="token"
                            value={token || ''}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount || ''}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                        Continue
                    </button>
                </div>

                {/* Security Notice */}
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