import React from "react";

import { Typography } from "@mui/material";
import { SentinelLevel } from "@/lib/enums";

type Props = {
  level: SentinelLevel;
  display: "card" | "dialog";
};

export default function SentinelText({ level, display }: Props) {
  const variant = display === "dialog" ? "body1" : "body2";
  const color = display === "dialog" ? "textPrimary" : "textSecondary";

  return (
    <Typography variant={variant} color={color} component="span">
      <Typography variant="inherit" component="span" sx={getStyle(level)}>
        {getLevelText(level)}
      </Typography>{" "}
      Sentinel Presence
    </Typography>
  );
}

const getLevelText = (level: SentinelLevel) => {
  switch (level) {
    case SentinelLevel.Low:
      return "Low";
    case SentinelLevel.High:
      return "High";
    case SentinelLevel.Aggressive:
      return <b>{"AGGRESSIVE"}</b>;
    case SentinelLevel.Corrupt:
      return "CORRUPT";
  }
};

const getStyle = (level: SentinelLevel) => {
  const border = 2;
  const borderRadius = border + "px";

  switch (level) {
    case SentinelLevel.Low:
      return {};

    case SentinelLevel.High:
      return {
        border,
        borderColor: "warning.main",
        borderRadius,
        bgcolor: "warning.main",
        color: "black",
      };

    case SentinelLevel.Aggressive:
      return {
        border,
        borderColor: "error.main",
        borderRadius,
        bgcolor: "error.main",
        color: "black",
      };

    case SentinelLevel.Corrupt:
      return {
        border,
        borderColor: "secondary.main",
        borderRadius,
        bgcolor: "secondary.main",
        color: "black",
      };

    default:
      return {};
  }
};
