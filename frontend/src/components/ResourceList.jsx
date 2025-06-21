export default function ResourceList() {
  const resources = [
    { name: "Red Cross Shelter", type: "shelter", location: "Lower East Side, NYC" },
  ];

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-2">Nearby Resources</h2>
      <ul>
        {resources.map((r, i) => (
          <li key={i}>
            <strong>{r.name}</strong> – {r.type} – {r.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
