"use client";
import React from "react";

import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import FormBox from "../FormBox";
import MyAutocomplete from "../MyAutocomplete";

import { useSystemListReducer } from "@/lib/customHooks";

import {
  agriculturalResources,
  biomeDescriptors,
  generalResources,
  localResources,
  stellarMetals,
} from "@/lib/lists";

export default function PlanetAddForm() {
  const { systemList } = useSystemListReducer();

  const sLabelID = React.useId();

  return (
    <React.Fragment>
      <FormBox>
        <TextField label="Planet Name" name="name" size="small" required />
        <MyAutocomplete
          label="System Name"
          name="system"
          options={systemList}
        />
      </FormBox>

      <FormBox>
        <MyAutocomplete
          label="Planet Descriptor"
          name="descriptor"
          options={biomeDescriptors}
        />
      </FormBox>

      <FormBox>
        <FormControlLabel label="Moon" control={<Checkbox name="moon" />} />
      </FormBox>

      <Divider sx={{ my: 0.5 }} />

      <FormBox>
        <MyAutocomplete
          label="Agricultural Resource"
          name="special"
          options={agriculturalResources}
          defaultValue="None"
        />
        <MyAutocomplete
          label="Stellar Metal"
          name="stellar"
          options={stellarMetals}
        />
      </FormBox>

      <FormBox>
        <MyAutocomplete
          label="Local Resource"
          name="local"
          options={localResources}
        />
        <MyAutocomplete
          label="General Resource"
          name="general"
          options={generalResources}
        />
      </FormBox>

      <Divider sx={{ my: 0.5 }} />

      <FormBox>
        <FormLabel id={sLabelID}>Sentinel Presence</FormLabel>
      </FormBox>
      <FormBox>
        <RadioGroup
          row
          defaultValue="low"
          name="sentinels"
          aria-labelledby={sLabelID}
        >
          <FormControlLabel label="Low" value="low" control={<Radio />} />
          <FormControlLabel label="High" value="high" control={<Radio />} />
          <FormControlLabel
            label="Aggressive"
            value="aggressive"
            control={<Radio />}
          />
          <FormControlLabel
            label="Corrupt"
            value="corrupt"
            control={<Radio />}
          />
        </RadioGroup>
      </FormBox>
    </React.Fragment>
  );
}
