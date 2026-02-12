import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthProvider from "@/components/providers/AuthProvider";

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <AuthProvider session={session}>
      <main>{children}</main>
    </AuthProvider>
  );
}
