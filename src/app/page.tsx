import React from "react";

import { Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Button href="/planets">Planets</Button>
      <Button href="/systems">Systems</Button>
    </div>
  );
}
