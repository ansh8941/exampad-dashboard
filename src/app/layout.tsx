"use client";
import { useEffect, useState } from "react";
import { Providers } from "@/redux/provider";
import ThemeProvider from "@/theme";
import ScrollToTop from "@/components/ScrollToTop";
import { AppLoader } from "@/components/loader";
import { styled } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const BodyStyle = styled("body")(({ theme }) => ({
  margin: "0px",
  color: "rgb(33, 43, 54)",
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: '"Public Sans", sans-serif',
  fontWeight: "400",
  backgroundColor: theme.palette.background.default,
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <html lang="en">
      <BodyStyle>
        <Providers>
          <ThemeProvider>
            {!!loading && <AppLoader />}
            <ScrollToTop />
            {children}
          </ThemeProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Providers>
      </BodyStyle>
    </html>
  );
}
