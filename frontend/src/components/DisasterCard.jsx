import Link from "next/link";

export default function DisasterCard({ disaster }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{disaster.title}</h2>
      <p className="text-sm text-gray-600">{disaster.location}</p>
      <p className="mt-2">{disaster.description}</p>
      <div className="flex gap-2 mt-2 flex-wrap">
        {disaster.tags.map((tag, i) => (
          <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <Link href={`/disasters/${disaster.id}`} className="text-blue-600 underline text-sm mt-2 inline-block">View Details</Link>
    </div>
  );
}
