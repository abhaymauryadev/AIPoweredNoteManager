import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";
import { connectDB } from "@/lib/db.js";
import User from "@/models/User.js";
import bcrypt from "bcryptjs";

// Get current user's profile
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findById(session.user.id).select("name email provider createdAt updatedAt preferences");
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        provider: user.provider,
        preferences: user.preferences || {},
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    },
    { status: 200 }
  );
}

// Update current user's profile and/or password
export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, currentPassword, newPassword, confirmPassword, preferences } = body;

  await connectDB();

  const user = await User.findById(session.user.id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Update basic profile (name)
  if (typeof name === "string" && name.trim().length > 0) {
    user.name = name.trim();
  }

  // Update preferences if provided
  if (preferences && typeof preferences === "object") {
    user.preferences = {
      ...(user.preferences?.toObject?.() || user.preferences || {}),
      ...preferences,
    };
  }

  // Handle password change for credentials users
  if (currentPassword || newPassword || confirmPassword) {
    if (user.provider !== "credentials") {
      return NextResponse.json(
        { message: "Password changes are only available for email/password accounts." },
        { status: 400 }
      );
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "Current password, new password, and confirmation are required." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "New password and confirmation do not match." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(currentPassword, user.password || "");
    if (!isValid) {
      return NextResponse.json({ message: "Current password is incorrect." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
  }

  await user.save();

  return NextResponse.json(
    {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        provider: user.provider,
        preferences: user.preferences || {},
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    },
    { status: 200 }
  );
}


