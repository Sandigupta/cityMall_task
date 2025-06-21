// src/app/disasters/[id]/page.jsx

import ImageVerificationForm from "@/components/ImageVerificationForm";
import SocialFeed from "@/components/SocialFeed";
import ResourceList from "@/components/ResourceList";
import ReportForm from "@/components/ReportForm";

export default async function DisasterDetailPage({ params }) {
  // ✅ This is fine
  const { id } = await params;

  // ✅ Basic validation
  if (!id) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-red-600">Invalid disaster ID</h1>
      </main>
    );
  }

  // ✅ Proper API fetch
  const res = await fetch(`https://citymall-task-3.onrender.com/disasters/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-red-600">Disaster not found</h1>
      </main>
    );
  }

  const data = await res.json();

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Disaster Details</h1>

      <div className="bg-white shadow p-4 rounded space-y-2">
        <p><strong>ID:</strong> {data.id}</p>
        <p><strong>Title:</strong> {data.title}</p>
        <p><strong>Location:</strong> {data.location_name}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Tags:</strong> {data.tags?.join(", ")}</p>
      </div>

      <ImageVerificationForm disasterId={id} />
      <SocialFeed disasterId={id} />
      <ResourceList disasterId={id} />
      <ReportForm disasterId={id} />
    </main>
  );
}
