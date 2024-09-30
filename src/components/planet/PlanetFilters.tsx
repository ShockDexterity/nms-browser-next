import React from "react";

import { Autocomplete, Grid, TextField } from "@mui/material";

import FormBox from "../FormBox";
import MyAutocomplete from "../MyAutocomplete";

import {
  agriculturalResources,
  biomes,
  generalResources,
  localResources,
  stellarMetals,
} from "@/lib/lists";

type Props = {
  boa: string;
  setBoa: React.Dispatch<React.SetStateAction<string>>;
  stellar: string;
  setStellar: React.Dispatch<React.SetStateAction<string>>;
  local: string;
  setLocal: React.Dispatch<React.SetStateAction<string>>;
  general: string;
  setGeneral: React.Dispatch<React.SetStateAction<string>>;
};

export default function PlanetFilters({
  boa,
  setBoa,
  stellar,
  setStellar,
  local,
  setLocal,
  general,
  setGeneral,
}: Props) {
  return (
    <Grid
      container
      spacing={2}
      display="flex"
      alignContent="center"
      justifyContent="center"
      sx={{}}
    >
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Autocomplete
          clearOnEscape
          options={biomes}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Biome/Agricultural"
              name=""
              size="small"
              required
            />
          )}
          value={boa !== "" ? boa : null}
          onInputChange={(event, value, reason) => {
            if (reason === "clear") {
              setBoa("");
            } else {
              setBoa(value);
            }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Autocomplete
          clearOnEscape
          options={stellarMetals}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Stellar Metal"
              name=""
              size="small"
              required
            />
          )}
          value={stellar !== "" ? stellar : null}
          onInputChange={(event, value, reason) => {
            if (reason === "clear") {
              setStellar("");
            } else {
              setStellar(value);
            }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Autocomplete
          clearOnEscape
          options={localResources}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Stellar Metal"
              name=""
              size="small"
              required
            />
          )}
          value={local !== "" ? local : null}
          onInputChange={(event, value, reason) => {
            if (reason === "clear") {
              setLocal("");
            } else {
              setLocal(value);
            }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Autocomplete
          clearOnEscape
          options={generalResources}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Stellar Metal"
              name=""
              size="small"
              required
            />
          )}
          value={general !== "" ? general : null}
          onInputChange={(event, value, reason) => {
            if (reason === "clear") {
              setGeneral("");
            } else {
              setGeneral(value);
            }
          }}
        />
      </Grid>
    </Grid>
  );
}
