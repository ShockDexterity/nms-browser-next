import { Box, Link, Typography } from "@mui/material";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({ title, subtitle = "" }: HeaderProps) {
  return (
    <Box sx={{ pb: 2, my: 2, borderBottom: 1, borderColor: "divider" }}>
      <Typography component="h1" variant="h5">
        <Link color="inherit" underline="none" href="/">
          {title}
        </Link>
      </Typography>

      {subtitle && <Typography variant="subtitle2">{subtitle}</Typography>}
    </Box>
  );
}
