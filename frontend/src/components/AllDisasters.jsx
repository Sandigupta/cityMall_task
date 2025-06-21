"use client";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import socket from "@/utils/socket";
import DisasterCard from "@/components/DisasterCard";

export default function AllDisasters() {
  const [disasters, setDisasters] = useState([]);

  async function fetchDisasters() {
    try {
      const res = await api.get("/disasters");
      setDisasters(res.data);
    } catch (err) {
      console.error("Error fetching disasters:", err);
    }
  }

  useEffect(() => {
    fetchDisasters(); // Initial load

    socket.on("disaster_updated", () => {
      console.log("Disaster update received");
      fetchDisasters(); // Re-fetch on change
    });

    return () => socket.off("disaster_updated");
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
