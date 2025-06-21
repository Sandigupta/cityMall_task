export default function UpdateList() {
  const updates = [
    { title: "Red Cross NYC Flood Update", link: "#" },
    { title: "FEMA Earthquake Response", link: "#" },
  ];

  return (
    <ul className="space-y-2">
      {updates.map((u, i) => (
        <li key={i}>
          <a href={u.link} className="text-blue-600 underline">{u.title}</a>
        </li>
      ))}
    </ul>
  );
}
