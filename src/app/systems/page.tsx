"use client";
import React from "react";

import {
  Button,
  Divider,
  Fab as FloatingActionButton,
  Grid,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import SystemAddForm from "@/components/system/SystemAddForm";
import SystemCard from "@/components/system/SystemCard";
import SystemDetails from "@/components/system/SystemDetails";
import SystemDialog from "@/components/system/SystemDialog";
import SystemEditForm from "@/components/system/SystemEditForm";

import { System } from "@/lib/types";

import {
  DEFAULT_SYS_REDUCER,
  SystemDispatchContext,
  SystemReducerContext,
  systemReducerFunction,
} from "@/lib/state/systemReducer";

import {
  DEFAULT_DLG_REDUCER,
  DialogDispatchContext,
  DialogReducerContext,
  dialogReducerFunction,
} from "@/lib/state/dialogReducer";

const fabSX = { position: "absolute", bottom: 16, right: 16 };

export default function PlanetPage() {
  const [systems, setSystems] = React.useState<System[]>([]);

  const [systemReducer, systemDispatch] = React.useReducer(
    systemReducerFunction,
    DEFAULT_SYS_REDUCER,
  );

  React.useEffect(() => {
    if (systemReducer.refresh) {
      fetchSystems(setSystems);
      systemDispatch({ type: "REFRESHED", payload: {} });
    }
  }, [systemReducer.refresh]);

  const [dialogReducer, dialogDispatch] = React.useReducer(
    dialogReducerFunction,
    DEFAULT_DLG_REDUCER,
  );

  const handleFabClick = () => {
    dialogDispatch({
      type: "SHOW_ADD_DIALOG",
      payload: { _for: "system", title: "Add a System" },
    });
  };

  if (systems.length === 0) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <SystemReducerContext.Provider value={systemReducer}>
      <SystemDispatchContext.Provider value={systemDispatch}>
        <DialogReducerContext.Provider value={dialogReducer}>
          <DialogDispatchContext.Provider value={dialogDispatch}>
            <Grid container spacing={2}>
              {systems.map((system) => {
                return <SystemCard key={system._id} system={system} />;
              })}
            </Grid>

            <Divider sx={{ py: 2, mb: 2 }} />

            <Button
              onClick={() => systemDispatch({ type: "REFRESH", payload: {} })}
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

            <SystemDialog>
              {dialogReducer.display === "DETAILS" && <SystemDetails />}
              {dialogReducer.display === "ADD_FORM" && <SystemAddForm />}
              {dialogReducer.display === "EDIT_FORM" && <SystemEditForm />}
            </SystemDialog>
          </DialogDispatchContext.Provider>
        </DialogReducerContext.Provider>
      </SystemDispatchContext.Provider>
    </SystemReducerContext.Provider>
  );
}

const fetchSystems = async (
  setSystems: React.Dispatch<React.SetStateAction<System[]>>,
) => {
  try {
    const response = await fetch("./api/systems", { method: "GET" });
    const data: System[] = await response.json();
    setSystems(data);
  } catch (err) {
    console.error(err);
    window.alert("Unable to retrieve data");
  }
};
