"use client";
import React from "react";

import { Button, Divider, Grid } from "@mui/material";

import PlanetCard from "@/components/PlanetCard";

import { Planet, System } from "@/lib/types";
// import { SystemListReducerAction } from "@/lib/state/types";
// import { useSystemListDispatch, useSystemListReducer } from "@/lib/customHooks";

export default function PlanetPage() {
  const [planets, setPlanets] = React.useState<Planet[]>([]);

  const [refresh, setRefresh] = React.useState<boolean>(true);

  // const { systemList } = useSystemListReducer();
  // const systemListDispatch = useSystemListDispatch();

  React.useEffect(() => {
    if (refresh) {
      // if (systemList.length === 0) {
      //   window.alert('please hit the "refresh" button');
      //   fetchSystems(systemListDispatch);
      // } else {
      //   console.log(systemList);
      // }

      fetchPlanets(setPlanets);
      setRefresh(false);
    }
  }, [refresh]);
  // }, [refresh, systemList, systemListDispatch]);

  if (planets.length === 0) {
    return <></>;
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

const fetchPlanets = async (
  setPlanets: React.Dispatch<React.SetStateAction<Planet[]>>,
) => {
  try {
    const response = await fetch("./api/planets", { method: "GET" });
    const data = await response.json();
    setPlanets(data);
  } catch (err) {
    console.error(err);
    window.alert("Unable to retrieve data, check console");
  }
};
