import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div className="flex-1">
      <h1>Welcome, {session.user?.name}</h1>
    </div>
  );
}
