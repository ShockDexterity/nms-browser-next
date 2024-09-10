"use client";
import React from "react";

import { Checkbox, Divider, FormControlLabel, TextField } from "@mui/material";

import FormBox from "../FormBox";
import MyAutocomplete from "../MyAutocomplete";

import {
  conflictLevels,
  econDescriptors,
  econStates,
  factions,
} from "@/lib/lists";
import {} from "@/lib/types";

export default function SystemAddForm() {
  return (
    <React.Fragment>
      <FormBox>
        <TextField label="System Name" name="name" size="small" required />

        <MyAutocomplete label="Faction" name="faction" options={factions} />
      </FormBox>

      <FormBox>
        <MyAutocomplete
          label="Conflict Level"
          name="conflict"
          options={conflictLevels}
        />
      </FormBox>

      <FormBox>
        <FormControlLabel
          label="Abandoned"
          control={<Checkbox name="abandoned" />}
        />
      </FormBox>

      <Divider sx={{ my: 0.5 }} />

      <FormBox>
        <MyAutocomplete
          label="Economy Descriptor"
          name="econDescriptor"
          options={econDescriptors}
        />
        <MyAutocomplete
          label="Economy State"
          name="econState"
          options={econStates}
        />
      </FormBox>

      <Divider sx={{ my: 0.5 }} />

      <FormBox>
        <FormControlLabel
          label="Atlas System"
          control={<Checkbox name="atlas" />}
        />
        <FormControlLabel
          label="Black Hole"
          control={<Checkbox name="blackhole" />}
        />
      </FormBox>
    </React.Fragment>
  );
}
