"use client";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import DisasterCard from "@/components/DisasterCard";

export default function AllDisasters() {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    async function fetchDisasters() {
      try {
        const res = await api.get("/disasters");
        setDisasters(res.data);
      } catch (err) {
        console.error("Error fetching disasters:", err);
      }
    }
    fetchDisasters();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">All Disasters</h1>
      <div className="grid gap-4">
        {disasters.map((disaster) => (
          <DisasterCard key={disaster.id} disaster={disaster} />
        ))}
      </div>
    </main>
  );
}
