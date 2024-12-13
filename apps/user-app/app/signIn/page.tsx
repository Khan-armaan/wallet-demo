"use client"
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import {   useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const SignInPage = () => {
    const router = useRouter()
    if (!router) {
        console.error("Router is not available");
        return null;
    }
    const { toast } = useToast()


    const [phone, setPhone] = useState('1111111111');
    const [password, setPassword] = useState('alice');
    const [isLoading, setIsLoading] = useState(false)
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        const result = await signIn('credentials', {
            phone,
            password,
            redirect: false,
        });
        if (result?.error) {
            setIsLoading(false)
            toast({
                title: 'Error',
                description: result.error
            })
            
            console.error(result.error);
        } else {
            router.push('/dashboard')
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                    Sign In
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/create-account" className="text-blue-500 hover:underline">
                        Create Account
                    </a>
                </p>
            </form>
        </div>
    );
};

export default SignInPage;
