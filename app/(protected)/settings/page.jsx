"use client";

import { signOut } from "next-auth/react";

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>

      <button onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
