"use client";
import React from "react";

import { System } from "@/lib/types";
import { Button, Divider } from "@mui/material";

export default function PlanetPage() {
  const [systems, setSystems] = React.useState<System[]>([]);

  const [refresh, setRefresh] = React.useState<boolean>(true);

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

    if (refresh) {
      console.log("fetching systems");
      fetchSystems();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <div>
      <ul>
        {systems.map((system) => {
          return (
            <li key={system.name + system.faction + system.conflict}>
              {system.name} ({system.faction})
            </li>
          );
        })}
      </ul>

      <Divider />

      <Button onClick={() => setRefresh(true)}>Refresh</Button>
    </div>
  );
}
