import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthProvider from "@/components/providers/AuthProvider";
import Sidebar from "@/components/common/Sidebar";
export default async function ProtectedLayout({ children }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <AuthProvider session={session}>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 text-gray-900">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
