import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";

import Header from "@/components/Header";

import theme from "@/lib/theme";
import UniversalProviders from "@/components/UniversalProviders";
import AlertSnackbar from "@/components/AlertSnackbar";

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
            <UniversalProviders>
              <Container>
                <Header title="No Man's Sky Discovery Browser" />

                {children}
              </Container>

              <AlertSnackbar />
            </UniversalProviders>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
