"use client";
import React from "react";

import { Button, Divider, Grid } from "@mui/material";

import SystemCard from "@/components/system/SystemCard";

import { System } from "@/lib/types";

export default function PlanetPage() {
  const [systems, setSystems] = React.useState<System[]>([]);

  const [refresh, setRefresh] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch("./api/systems", { method: "GET" });
        const data: System[] = await response.json();
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

  if (systems.length === 0) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {systems.map((system) => {
          return <SystemCard key={system._id} system={system}></SystemCard>;
        })}
      </Grid>

      <Divider sx={{ py: 2, mb: 2 }} />

      <Button onClick={() => setRefresh(true)}>Refresh</Button>
    </React.Fragment>
  );
}
