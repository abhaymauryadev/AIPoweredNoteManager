import { getServerSession } from "next-auth";
import Sidebar from "@/components/common/Sidebar";
export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <>
    <div className="flex">
    <Sidebar/>
    <div className="flex-1">
      <h1>Welcome, {session.user.name}</h1>
    </div>
    </div>
    </>
  );
}
