import React from "react";

import {
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

import { System } from "@/lib/types";
import { getSystemBorder } from "@/lib/customFunctions";

type Props = {
  system: System;
};

export default function SystemCard({ system }: Props) {
  const handleDetailsClick = (event: React.SyntheticEvent) => {
    console.log("Details Not Yet Implemented");
  };

  const handleEditClick = (event: React.SyntheticEvent) => {
    console.log("Edit Not Yet Implemented");
  };

  const handleDeleteClick = (event: React.SyntheticEvent) => {
    console.log("Delete Not Yet Implemented");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={getSystemBorder(system.atlas, system.blackhole)}>
        <CardActionArea onClick={handleDetailsClick}>
          <CardHeader
            title={system.name}
            titleTypographyProps={{ variant: "h6" }}
            subheader={
              system.faction + (system.abandoned ? " (Abandoned)" : "")
            }
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Econ: {system.economy.strength}{" "}
              {system.economy.type.replace("Advanced", "Adv.")}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Conflict Level: {system.conflict}
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
