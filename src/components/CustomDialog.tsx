import React from "react";

import { Dialog } from "@mui/material";

import { useDialogDispatch, useDialogReducer } from "@/lib/customHooks";

type Props = {
  for: "planet" | "system";
};

export default function CustomDialog(props: Props) {
  const reducer = useDialogReducer();
  const dispatch = useDialogDispatch();

  return <Dialog open={false}></Dialog>;
}
