"use client";
import React from "react";

import { Planet } from "@/lib/types";
import { SentinelLevel } from "@/lib/enums";

export default function PlanetPage() {
  const [planets, setPlanets] = React.useState<Planet[]>([]);

  React.useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch("./api/planets", { method: "GET" });
        const data = await response.json();
        setPlanets(data);
      } catch (err) {
        console.error(err);
        window.alert("Unable to retrieve data");
      }
    };

    fetchPlanets();
  }, []);

  if (planets.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      <ul>
        {planets.map((planet) => {
          return (
            <li key={planet._id}>
              {planet.name} (
              {planet.sentinels === SentinelLevel.Aggressive
                ? planet.sentinels.toUpperCase()
                : planet.sentinels}
              ) | {planet._id}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
