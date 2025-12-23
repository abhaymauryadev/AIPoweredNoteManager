"use client";

export default function Error({ error, reset }) {
  return (
    <div className="text-center space-y-4 py-20">
      <h2 className="text-2xl font-semibold">
        Something went wrong
      </h2>

      <p className="text-gray-500">
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}