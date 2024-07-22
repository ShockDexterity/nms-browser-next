// "use client";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
// import { usePathname } from "next/navigation";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({ title, subtitle = "" }: HeaderProps) {
  // const pathname = usePathname();

  return (
    <Box sx={{ pb: 2, my: 2, borderBottom: 1, borderColor: "divider" }}>
      <Typography component="h1" variant="h5">
        <Link color="inherit" underline="none" href="/">
          {title}
        </Link>
      </Typography>

      {/* {pathname !== "/" && (
        <Breadcrumbs>
          <Typography variant="subtitle2">Home</Typography>
          <Typography variant="subtitle2" color="text.primary">
            {pathname.split("/")[1]}
          </Typography>
        </Breadcrumbs>
      )} */}
    </Box>
  );
}
