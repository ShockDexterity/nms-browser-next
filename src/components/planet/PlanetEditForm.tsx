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
  biomes,
  generalResources,
  localResources,
  stellarMetals,
} from "@/lib/lists";
import { System } from "@/lib/types";
import { usePlanetReducer } from "@/lib/customHooks";

export default function PlanetEditForm() {
  const [systemList, setSystemList] = React.useState<string[]>([]);
  const { planet } = usePlanetReducer();

  const SentinelLabelId = React.useId();

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
        <TextField
          label="Planet Name"
          name="name"
          size="small"
          defaultValue={planet.name ?? ""}
          required
        />
        <MyAutocomplete
          label="System Name"
          name="system"
          options={systemList}
          defaultValue={planet.system ?? ""}
        />
      </FormBox>

      <FormBox>
        <MyAutocomplete
          label="Planet Descriptor"
          name="descriptor"
          options={biomeDescriptors}
          defaultValue={planet.descriptor ?? ""}
        />
        <MyAutocomplete
          label="Biome"
          name="biome"
          options={biomes}
          defaultValue={planet.biome ?? ""}
        />
      </FormBox>

      <FormBox>
        <FormControlLabel
          label="Moon"
          control={
            <Checkbox name="moon" defaultChecked={planet.moon ?? false} />
          }
        />
      </FormBox>

      <Divider sx={{ my: 0.5 }} />

      <FormBox>
        <MyAutocomplete
          label="Agricultural Resource"
          name="agricultural"
          options={agriculturalResources}
          defaultValue={planet.resources.agricultural ?? "None"}
        />
        <MyAutocomplete
          label="Stellar Metal"
          name="stellar"
          options={stellarMetals}
          defaultValue={planet.resources.stellar ?? ""}
        />
      </FormBox>

      <FormBox>
        <MyAutocomplete
          label="Local Resource"
          name="local"
          options={localResources}
          defaultValue={planet.resources.local ?? ""}
        />
        <MyAutocomplete
          label="Other Resource"
          name="general"
          options={generalResources}
          defaultValue={planet.resources.general ?? ""}
        />
      </FormBox>

      <Divider sx={{ my: 0.5 }} />

      <FormBox>
        <FormLabel id={SentinelLabelId}>Sentinel Presence</FormLabel>
      </FormBox>
      <FormBox>
        <RadioGroup
          defaultValue={planet.sentinels ?? "low"}
          name="sentinels"
          aria-labelledby={SentinelLabelId}
          row
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
