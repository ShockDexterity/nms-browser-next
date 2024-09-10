"use client";
import React from "react";

import { Checkbox, Divider, FormControlLabel, TextField } from "@mui/material";

import FormBox from "../FormBox";
import MyAutocomplete from "../MyAutocomplete";

import {
  conflictLevels,
  econDescriptors,
  econStates,
  econStrengths,
  econTypes,
  factions,
} from "@/lib/lists";
import { useSystemReducer } from "@/lib/customHooks";
import {} from "@/lib/types";

export default function SystemEditForm() {
  const { system } = useSystemReducer();

  return (
    <React.Fragment>
      <FormBox>
        <TextField
          label="System Name"
          name="name"
          size="small"
          defaultValue={system?.name ?? ""}
          required
        />

        <MyAutocomplete
          label="Faction"
          name="faction"
          options={factions}
          defaultValue={system?.faction ?? ""}
        />
      </FormBox>

      <FormBox>
        <MyAutocomplete
          label="Conflict Level"
          name="conflict"
          options={conflictLevels}
          defaultValue={system?.conflict ?? ""}
        />
      </FormBox>

      <FormBox>
        <FormControlLabel
          label="Abandoned"
          control={
            <Checkbox
              name="abandoned"
              defaultChecked={system?.abandoned ?? false}
            />
          }
        />
      </FormBox>

      <Divider sx={{ my: 0.5 }} />

      <FormBox>
        <MyAutocomplete
          label="Economy Descriptor"
          name="econDescriptor"
          options={econDescriptors}
          defaultValue={system?.economy?.descriptor ?? ""}
        />
        <MyAutocomplete
          label="Economy State"
          name="econState"
          options={econStates}
          defaultValue={system?.economy?.state ?? ""}
        />
      </FormBox>

      <FormBox>
        <MyAutocomplete
          label="Economy Type"
          name="econType"
          options={econTypes}
          defaultValue={system?.economy?.type ?? ""}
        />
        <MyAutocomplete
          label="Economy Strength"
          name="econStrength"
          options={econStrengths}
          defaultValue={system?.economy?.strength ?? ""}
        />
      </FormBox>

      <Divider sx={{ my: 0.5 }} />

      <FormBox>
        <FormControlLabel
          label="Atlas Station"
          control={
            <Checkbox name="atlas" defaultChecked={system?.atlas ?? false} />
          }
        />
        <FormControlLabel
          label="Black Hole"
          control={
            <Checkbox
              name="blackhole"
              defaultChecked={system?.blackhole ?? false}
            />
          }
        />
      </FormBox>

      <Divider sx={{ my: 0.5 }} />

      <FormBox>
        <FormControlLabel
          label="Exosuit Claimed"
          control={
            <Checkbox
              name="exosuit"
              defaultChecked={system?.exosuit ?? false}
            />
          }
        />
        <FormControlLabel
          label="AtlasPass v3 Claimed"
          control={<Checkbox name="v3" defaultChecked={system?.v3 ?? false} />}
        />
      </FormBox>
    </React.Fragment>
  );
}
