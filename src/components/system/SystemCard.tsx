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

import {
  useDialogDispatch,
  useSnackbarDispatch,
  useSystemDispatch,
} from "@/lib/customHooks";

type Props = {
  system: System;
};

export default function SystemCard({ system }: Props) {
  const systemDispatch = useSystemDispatch();
  const dialogDispatch = useDialogDispatch();
  const snackbarDispatch = useSnackbarDispatch();

  const handleDetailsClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    systemDispatch({ type: "SAVE", payload: { system } });
    dialogDispatch({
      type: "SHOW_DETAILS_DIALOG",
      payload: { _for: "system", title: system.name },
    });
  };

  const handleEditClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    systemDispatch({ type: "SAVE", payload: { system } });
    dialogDispatch({
      type: "SHOW_EDIT_DIALOG",
      payload: { _for: "system", title: `Edit ${system.name}` },
    });
  };

  const handleDeleteClick = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (window.confirm(`Are you sure you want to delete "${system.name}"?`)) {
      const apiResponse = await fetch(`./api/systems/${system._id}`, {
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
          payload: { message: `Failed to delete "${system.name}"` },
        });
        snackbarDispatch({ type: "SHOW_SNACKBAR", payload: {} });
      } else {
        systemDispatch({ type: "REFRESH", payload: {} });

        snackbarDispatch({ type: "HIDE_SNACKBAR", payload: {} });
        snackbarDispatch({
          type: "SET_SNACKBAR_SEVERITY",
          payload: { severity: "success" },
        });
        snackbarDispatch({
          type: "SET_SNACKBAR_MESSAGE",
          payload: { message: `Successfully deleted "${system.name}"` },
        });
        snackbarDispatch({ type: "SHOW_SNACKBAR", payload: {} });
      }
    }
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
