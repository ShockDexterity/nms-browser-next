import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Button, Container, CssBaseline, ThemeProvider } from "@mui/material";

import Header from "@/components/Header";

import theme from "@/lib/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
              <Header title="No Man's Sky Discovery Browser" />

              {children}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
