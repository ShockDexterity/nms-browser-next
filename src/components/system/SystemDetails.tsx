import React from "react";

import { Divider, Typography } from "@mui/material";

import {} from "@/lib/customFunctions";
import { useSystemReducer } from "@/lib/customHooks";

export default function SystemDetails() {
  const { system } = useSystemReducer();

  return (
    <React.Fragment>
      <Typography variant="body1">
        Faction: {system.faction + (system.abandoned ? " (Abandoned)" : "")}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Typography variant="body1">
        {system.economy.strength} {system.economy.type} Economy
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Typography variant="body1">Conflict Level: {system.conflict}</Typography>

      {!system.exosuit && (
        <React.Fragment>
          <Divider sx={{ my: 1 }} />

          <Typography variant="body1">Exosuit Upgrade: Unclaimed</Typography>
        </React.Fragment>
      )}

      {!system.v3 && (
        <React.Fragment>
          <Divider sx={{ my: 1 }} />

          <Typography variant="body1">AtlasPass v3 Room: Unopened</Typography>
        </React.Fragment>
      )}

      {system.atlas && (
        <React.Fragment>
          <Divider sx={{ my: 1 }} />

          <Typography variant="body1">Atlas Station Present</Typography>
        </React.Fragment>
      )}

      {system.blackhole && (
        <React.Fragment>
          <Divider sx={{ my: 1 }} />

          <Typography variant="body1">Black Hole Present</Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
