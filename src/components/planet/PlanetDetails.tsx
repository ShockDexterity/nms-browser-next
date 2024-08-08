import React from "react";

import { Divider, Typography } from "@mui/material";

import SentinelText from "../SentinelText";

import { DialogReducerContext } from "@/lib/state/dialogReducer";
import { getBiomeBorder } from "@/lib/customFunctions";

export default function PlanetDetails() {
  const { planet } = React.useContext(DialogReducerContext);

  return (
    <React.Fragment>
      <Typography variant="body1">
        Biome:{" "}
        <Typography
          variant="body1"
          component="span"
          sx={getBiomeBorder(
            planet.extreme,
            planet.infested,
            planet.exotic,
            false,
          )}
        >
          {planet.biome}
        </Typography>
      </Typography>

      <Divider sx={{ my: 1 }} />

      <SentinelText level={planet.sentinels} display="dialog" />

      <Divider sx={{ my: 1 }} />

      {planet.resources.agricultural !== "None" && (
        <Typography variant="body1">
          Agricultural Resource: {planet.resources.agricultural}
        </Typography>
      )}

      <Typography variant="body1">
        Stellar Metal: {planet.resources.stellar}
      </Typography>

      <Typography variant="body1">
        Biome Resource: {planet.resources.local}
      </Typography>

      <Typography variant="body1">
        General Resource: {planet.resources.general}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Typography variant="body1">{planet.system} System</Typography>
    </React.Fragment>
  );
}
