import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20 space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-600">
        The page you’re looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="inline-block px-4 py-2 bg-black text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
}
