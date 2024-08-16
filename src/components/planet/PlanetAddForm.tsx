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

import {
  agriculturalResources,
  biomeDescriptors,
  generalResources,
  localResources,
  stellarMetals,
} from "@/lib/lists";
import { System } from "@/lib/types";

export default function PlanetAddForm() {
  const [systemList, setSystemList] = React.useState<string[]>([]);

  const sLabelID = React.useId();

  React.useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch("./api/systems", { method: "GET" });
        const data: System[] = await response.json();

        setSystemList(
          data
            .map((value) => {
              return value.name;
            })
            .sort((a, b) => {
              return a.localeCompare(b);
            }),
        );
      } catch (err) {
        console.error(err);
        window.alert("Unable to retrieve data");
      }
    };

    fetchSystems();
  }, []);

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
