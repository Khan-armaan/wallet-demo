import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
   
    onSignin: () => void,
    onSignout: () => void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 border-slate-300">
        <div className="text-4xl text-[#6a51a6] pt-2 font-bold flex flex-col justify-center  ">
            Wallet
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}