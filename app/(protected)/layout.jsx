import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
        <strong>Dashboard</strong>
      </nav>
      <main style={{ padding: "1rem" }}>{children}</main>
    </div>
  );
}
