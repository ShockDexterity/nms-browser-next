"use client";
import React from "react";

import { System } from "@/lib/types";

export default function PlanetPage() {
  const [systems, setSystems] = React.useState<System[]>([]);

  React.useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch("./api/systems", { method: "GET" });
        const data = await response.json();
        setSystems(data);
      } catch (err) {
        console.error(err);
        window.alert("Unable to retrieve data");
      }
    };

    fetchSystems();
  }, []);

  return (
    <div>
      <ul>
        {systems.map((system) => {
          return (
            <li key={system.name + system.faction + system.conflict}>
              {system.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
