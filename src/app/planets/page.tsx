"use client";
import React from "react";

import { Button, Divider, Grid } from "@mui/material";

import PlanetCard from "@/components/PlanetCard";

import { Planet } from "@/lib/types";

export default function PlanetPage() {
  const [planets, setPlanets] = React.useState<Planet[]>([]);

  const [refresh, setRefresh] = React.useState<boolean>(true);

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

    if (refresh) {
      console.log("fetching planets");
      fetchPlanets();
      setRefresh(false);
    }
  }, [refresh]);

  if (planets.length === 0) {
    return <div></div>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {planets.map((planet) => {
          return <PlanetCard key={planet._id} planet={planet}></PlanetCard>;
        })}
      </Grid>

      <Divider sx={{ py: 2, mb: 2 }} />

      <Button onClick={() => setRefresh(true)}>Refresh</Button>
    </>
  );
}
