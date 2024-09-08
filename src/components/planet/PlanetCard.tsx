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

import SentinelText from "./SentinelText";

import { Planet } from "@/lib/types";
import { getBiomeBorder, getDescriptor } from "@/lib/customFunctions";
import {
  useDialogDispatch,
  usePlanetDispatch,
  useSnackbarDispatch,
} from "@/lib/customHooks";

type Props = {
  planet: Planet;
};

export default function PlanetCard({ planet }: Props) {
  const planetDispatch = usePlanetDispatch();
  const dialogDispatch = useDialogDispatch();
  const snackbarDispatch = useSnackbarDispatch();

  const handleDetailsClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    planetDispatch({ type: "SAVE", payload: { planet } });
    dialogDispatch({
      type: "SHOW_DETAILS_DIALOG",
      payload: { _for: "planet", title: planet.name },
    });
  };

  const handleEditClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    planetDispatch({ type: "SAVE", payload: { planet } });
    dialogDispatch({
      type: "SHOW_EDIT_DIALOG",
      payload: { _for: "planet", title: `Edit ${planet.name}` },
    });
  };

  const handleDeleteClick = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (window.confirm(`Are you sure you want to delete "${planet.name}"?`)) {
      const apiResponse = await fetch(`./api/planets/${planet._id}`, {
        method: "DELETE",
      });
      const response = await apiResponse.json();

      if (response.error) {
        snackbarDispatch({ type: "HIDE_SNACKBAR", payload: {} });
        snackbarDispatch({
          type: "SET_SNACKBAR_SEVERITY",
          payload: { severity: "error" },
        });
        snackbarDispatch({
          type: "SET_SNACKBAR_MESSAGE",
          payload: { message: `Failed to delete "${planet.name}"` },
        });
        snackbarDispatch({ type: "SHOW_SNACKBAR", payload: {} });
      } else {
        planetDispatch({ type: "REFRESH", payload: {} });

        snackbarDispatch({ type: "HIDE_SNACKBAR", payload: {} });
        snackbarDispatch({
          type: "SET_SNACKBAR_SEVERITY",
          payload: { severity: "success" },
        });
        snackbarDispatch({
          type: "SET_SNACKBAR_MESSAGE",
          payload: { message: `Successfully deleted "${planet.name}"` },
        });
        snackbarDispatch({ type: "SHOW_SNACKBAR", payload: {} });
      }
    }
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
