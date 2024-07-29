"use client";
import React from "react";

import { Button, Divider, Grid } from "@mui/material";

import PlanetCard from "@/components/PlanetCard";

import {
  DEFAULT_PLN_REDUCER,
  PlanetDispatchContext,
  planetReducerFunction,
  PlanetReducerContext,
} from "@/lib/state/planetReducer";

import { Planet /*, System */ } from "@/lib/types";
// import { SystemListReducerAction } from "@/lib/state/types";
// import { useSystemListDispatch, useSystemListReducer } from "@/lib/customHooks";

export default function PlanetPage() {
  const [planets, setPlanets] = React.useState<Planet[]>([]);

  const [planetReducer, planetDispatch] = React.useReducer(
    planetReducerFunction,
    DEFAULT_PLN_REDUCER,
  );

  // const { systemList } = useSystemListReducer();
  // const systemListDispatch = useSystemListDispatch();

  React.useEffect(() => {
    if (planetReducer.refresh) {
      // if (systemList.length === 0) {
      //   window.alert('please hit the "refresh" button');
      //   fetchSystems(systemListDispatch);
      // } else {
      //   console.log(systemList);
      // }

      fetchPlanets(setPlanets);
      planetDispatch({ type: "REFRESHED", payload: {} });
    }
  }, [planetReducer.refresh]);
  // }, [planetReducer.refresh, systemList, systemListDispatch]);

  if (planets.length === 0) {
    return <></>;
  }

  return (
    <PlanetReducerContext.Provider value={planetReducer}>
      <PlanetDispatchContext.Provider value={planetDispatch}>
        <Grid container spacing={2}>
          {planets.map((planet) => {
            return <PlanetCard key={planet._id} planet={planet}></PlanetCard>;
          })}
        </Grid>

        <Divider sx={{ py: 2, mb: 2 }} />

        <Button
          onClick={() => planetDispatch({ type: "REFRESHED", payload: {} })}
        >
          Refresh
        </Button>
      </PlanetDispatchContext.Provider>
    </PlanetReducerContext.Provider>
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
