"use client";
import React from "react";

import {
  Button,
  Collapse,
  Divider,
  Fab as FloatingActionButton,
  Grid,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import PlanetAddForm from "@/components/planet/PlanetAddForm";
import PlanetCard from "@/components/planet/PlanetCard";
import PlanetDetails from "@/components/planet/PlanetDetails";
import PlanetDialog from "@/components/planet/PlanetDialog";
import PlanetEditForm from "@/components/planet/PlanetEditForm";

import { Planet, PlanetFilter } from "@/lib/types";

import {
  DEFAULT_PLN_REDUCER,
  PlanetDispatchContext,
  planetReducerFunction,
  PlanetReducerContext,
} from "@/lib/state/planetReducer";

import {
  DEFAULT_DLG_REDUCER,
  DialogDispatchContext,
  DialogReducerContext,
  dialogReducerFunction,
} from "@/lib/state/dialogReducer";

import PlanetFilters from "@/components/planet/PlanetFilters";

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

  const [boa, setBoa] = React.useState<string>("");
  const [stellar, setStellar] = React.useState<string>("");
  const [local, setLocal] = React.useState<string>("");
  const [general, setGeneral] = React.useState<string>("");

  const filterPlanets = (value: Planet) => {
    return planetFilterCheck(value, {
      boa: "",
      stellar: "",
      local: "",
      general: "",
    });
  };

  const [showFilters, setShowFilters] = React.useState<boolean>(false);

  return (
    <PlanetReducerContext.Provider value={planetReducer}>
      <PlanetDispatchContext.Provider value={planetDispatch}>
        <DialogReducerContext.Provider value={dialogReducer}>
          <DialogDispatchContext.Provider value={dialogDispatch}>
            <Button
              variant="contained"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            <Divider sx={{ pb: 2, mb: 2 }} />

            <Collapse in={showFilters}>
              <PlanetFilters
                boa={boa}
                setBoa={setBoa}
                stellar={stellar}
                setStellar={setStellar}
                local={local}
                setLocal={setLocal}
                general={general}
                setGeneral={setGeneral}
              />
              <Divider sx={{ pb: 2, mb: 2 }} />
            </Collapse>

            <Grid container spacing={2}>
              {planets
                .filter((value) =>
                  planetFilterCheck(value, {
                    boa,
                    stellar,
                    local,
                    general,
                  }),
                )
                .map((planet) => (
                  <PlanetCard key={planet._id} planet={planet} />
                ))}
            </Grid>

            <Divider sx={{ py: 2, mb: 2 }} />

            <Button
              onClick={() => planetDispatch({ type: "REFRESH", payload: {} })}
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
              {dialogReducer.display === "DETAILS" && <PlanetDetails />}
              {dialogReducer.display === "ADD_FORM" && <PlanetAddForm />}
              {dialogReducer.display === "EDIT_FORM" && <PlanetEditForm />}
            </PlanetDialog>
          </DialogDispatchContext.Provider>
        </DialogReducerContext.Provider>
      </PlanetDispatchContext.Provider>
    </PlanetReducerContext.Provider>
  );
}

async function fetchPlanets(
  setPlanets: React.Dispatch<React.SetStateAction<Planet[]>>,
) {
  try {
    const response = await fetch("./api/planets", { method: "GET" });
    const data: Planet[] = await response.json();
    setPlanets(data);
  } catch (err) {
    console.error(err);
    window.alert("Unable to retrieve data, check console");
  }
}

function planetFilterCheck(planet: Planet, filter: PlanetFilter) {
  const { boa, stellar, local, general } = filter;
  if (boa === "" && stellar === "" && local === "" && general === "") {
    return true;
  }

  let result = true;

  if (boa !== "") {
    result &&= planet.biome === boa || planet.resources.agricultural === boa;
  }

  if (stellar !== "") {
    result &&= planet.resources.stellar === stellar;
  }

  if (local !== "") {
    result &&= planet.resources.local === local;
  }

  if (general !== "") {
    result &&= planet.resources.general === general;
  }

  return result;
}
