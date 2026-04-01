import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import crypto from "crypto";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ message: "Cloudinary is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "ai-note-manager";
  const paramsToSign = { folder, timestamp };
  const signatureString = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");
  const signature = crypto
    .createHash("sha1")
    .update(`${signatureString}${apiSecret}`)
    .digest("hex");

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("api_key", apiKey);
  uploadData.append("timestamp", timestamp.toString());
  uploadData.append("folder", folder);
  uploadData.append("signature", signature);

  const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: uploadData,
  });

  const result = await cloudinaryResponse.json();
  if (!cloudinaryResponse.ok) {
    return NextResponse.json(
      {
        message: result.error?.message || "Cloudinary upload failed.",
        details: result,
      },
      { status: cloudinaryResponse.status }
    );
  }

  return NextResponse.json({ url: result.secure_url, public_id: result.public_id }, { status: 200 });
}
