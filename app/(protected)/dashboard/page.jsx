import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
    </div>
  );
}
