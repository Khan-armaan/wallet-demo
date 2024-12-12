import getUserDetails from "@/app/lib/actions/getUserDetails";


export default async function DashboardPage() { 
const userDetails = await getUserDetails()
const userId = userDetails?.data?.id

  return (
    <div>
        <h1></h1>
    </div>
  );
}
