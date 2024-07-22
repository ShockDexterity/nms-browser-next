import React from "react";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

import SentinelText from "./SentinelText";

import { Planet } from "@/lib/types";
import { getBiomeBorder, getDescriptor } from "@/lib/customFunctions";

type Props = {
  planet: Planet;
};

export default function PlanetCard({ planet }: Props) {
  const handleDetailsClick = (event: React.SyntheticEvent) => {
    console.log("Details Not Yet Implemented");
  };

  const handleEditClick = (event: React.SyntheticEvent) => {
    console.log("Edit Yet Implemented");
  };

  const handleDeleteClick = (event: React.SyntheticEvent) => {
    console.log("Delete Not Yet Implemented");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={getBiomeBorder(planet.extreme, planet.infested, planet.exotic)}>
        <CardActionArea onClick={handleDetailsClick}>
          <CardHeader
            title={planet.name}
            titleTypographyProps={{ variant: "h6" }}
            subheader={getDescriptor(planet.descriptor, planet.moon)}
          />

          <CardContent>
            <SentinelText level={planet.sentinels} display="card" />

            <Typography variant="body2" color="textSecondary" component="p">
              {planet.system} System
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <IconButton
            aria-label="edit"
            size="small"
            color="warning"
            onClick={handleEditClick}
            sx={{ mr: 2 }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={handleDeleteClick}
            sx={{ ml: 2 }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
