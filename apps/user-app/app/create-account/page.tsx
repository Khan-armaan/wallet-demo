"use client"
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import {  useRouter } from 'next/navigation';



export default function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [responseData, setResponseData] = useState<ApiResponse >({message: "", success: false, data: {}})

    const { toast } = useToast()
    const router = useRouter()
 
    interface ApiResponse{
        message: string,
        success: boolean,
        data: any
    }

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post<ApiResponse>('/api/create-account', {
                name,
                email,
                number,
                password,
            });
      setResponseData(response.data)

       if (responseData.success){
        router.push('/signIn')
       }
    
       if(!responseData.success){
        toast({
            title: "Error",
            description: responseData.message,
            variant: "destructive"
        })
       }

        } catch (error) {
           console.log(error)
           toast({
            title: "Error",
            description: "SomeThing went wrong while creating your account",
            variant: "destructive"
           })
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div>
                            <input
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="Phone Number"
                                type="tel"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
