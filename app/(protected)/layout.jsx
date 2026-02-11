import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
