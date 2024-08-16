"use client";
import React from "react";

import {
  Button,
  Divider,
  Fab as FloatingActionButton,
  Grid,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import PlanetAddForm from "@/components/planet/PlanetAddForm";
import PlanetCard from "@/components/planet/PlanetCard";
import PlanetDialog from "@/components/planet/PlanetDialog";
import PlanetDetails from "@/components/planet/PlanetDetails";

import {
  DEFAULT_PLN_REDUCER,
  PlanetDispatchContext,
  planetReducerFunction,
  PlanetReducerContext,
} from "@/lib/state/planetReducer";

import { Planet } from "@/lib/types";

import {
  DEFAULT_DLG_REDUCER,
  DialogDispatchContext,
  DialogReducerContext,
  dialogReducerFunction,
} from "@/lib/state/dialogReducer";

const fabSX = { position: "absolute", bottom: 16, right: 16 };

export default function PlanetPage() {
  const [planets, setPlanets] = React.useState<Planet[]>([]);

  const [planetReducer, planetDispatch] = React.useReducer(
    planetReducerFunction,
    DEFAULT_PLN_REDUCER,
  );

  React.useEffect(() => {
    if (planetReducer.refresh) {
      fetchPlanets(setPlanets);
      planetDispatch({ type: "REFRESHED", payload: {} });
    }
  }, [planetReducer.refresh]);

  const [dialogReducer, dialogDispatch] = React.useReducer(
    dialogReducerFunction,
    DEFAULT_DLG_REDUCER,
  );

  const handleFabClick = () => {
    dialogDispatch({
      type: "SHOW_ADD_DIALOG",
      payload: { _for: "planet", title: "Add a Planet" },
    });
  };

  if (planets.length === 0) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <PlanetReducerContext.Provider value={planetReducer}>
      <PlanetDispatchContext.Provider value={planetDispatch}>
        <DialogReducerContext.Provider value={dialogReducer}>
          <DialogDispatchContext.Provider value={dialogDispatch}>
            <Grid container spacing={2}>
              {planets.map((planet) => {
                return (
                  <PlanetCard key={planet._id} planet={planet}></PlanetCard>
                );
              })}
            </Grid>

            <Divider sx={{ py: 2, mb: 2 }} />

            <Button
              onClick={() => planetDispatch({ type: "REFRESHED", payload: {} })}
            >
              Refresh
            </Button>

            <FloatingActionButton
              color="primary"
              sx={fabSX}
              onClick={handleFabClick}
            >
              <AddIcon />
            </FloatingActionButton>

            <PlanetDialog>
              {dialogReducer.display === "ADD_FORM" && <PlanetAddForm />}
              {dialogReducer.display === "DETAILS" && <PlanetDetails />}
            </PlanetDialog>
          </DialogDispatchContext.Provider>
        </DialogReducerContext.Provider>
      </PlanetDispatchContext.Provider>
    </PlanetReducerContext.Provider>
  );
}

const fetchPlanets = async (
  setPlanets: React.Dispatch<React.SetStateAction<Planet[]>>,
) => {
  try {
    const response = await fetch("./api/planets", { method: "GET" });
    const data: Planet[] = await response.json();
    setPlanets(data);
  } catch (err) {
    console.error(err);
    window.alert("Unable to retrieve data, check console");
  }
};
