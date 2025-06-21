export default function SocialFeed() {
  const posts = [
    { user: "citizen1", post: "#flood Need food in NYC" },
    { user: "user42", post: "#earthquake Buildings damaged in Delhi" },
  ];

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-2">Live Social Media Posts</h2>
      <ul className="list-disc ml-5">
        {posts.map((p, i) => (
          <li key={i}><strong>@{p.user}</strong>: {p.post}</li>
        ))}
      </ul>
    </div>
  );
}
