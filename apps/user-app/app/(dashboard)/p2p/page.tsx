import { SendCard } from "../../../components/SendCard";

export default function() {
    return <div className="w-full h-screen flex flex-col">
          <div className="text-4xl text-[#6a51a6] pt-8 font-bold">
            Send Money
        </div>
        <div className="flex-grow flex items-center justify-center">
            <SendCard />
        </div>
    </div>
}