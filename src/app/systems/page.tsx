"use client";
import React from "react";

import { Button, Divider, Grid } from "@mui/material";

import SystemCard from "@/components/SystemCard";

import { System } from "@/lib/types";
import { useSystemListDispatch } from "@/lib/customHooks";

export default function PlanetPage() {
  const [systems, setSystems] = React.useState<System[]>([]);

  const [refresh, setRefresh] = React.useState<boolean>(true);

  const systemListDispatch = useSystemListDispatch();

  React.useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch("./api/systems", { method: "GET" });
        const data: System[] = await response.json();
        setSystems(data);

        const sortedData = data
          .map((value) => {
            return value.name;
          })
          .sort((a, b) => {
            return a.localeCompare(b);
          });

        systemListDispatch({
          type: "SET_LIST",
          payload: {
            systemList: sortedData,
          },
        });
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
  }, [refresh, systemListDispatch]);

  if (systems.length === 0) {
    return <></>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {systems.map((system) => {
          return <SystemCard key={system._id} system={system}></SystemCard>;
        })}
      </Grid>

      <Divider sx={{ py: 2, mb: 2 }} />

      <Button onClick={() => setRefresh(true)}>Refresh</Button>
    </>
  );
}
