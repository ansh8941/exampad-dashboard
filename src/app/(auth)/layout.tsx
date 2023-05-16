"use client";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import useResponsive from "@/hooks/useResponsive";
import { Card, Link, Container, Typography, Box } from "@mui/material";
import Logo from "@/components/Logo";
import { AppLoader } from "@/components/loader";

import { useAppSelector } from "@/redux/hooks";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);

  const { isAuthanticate } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");

  useEffect(() => {
    if (isAuthanticate) {
      router.push("/dashboard");
    } else {
      setHasAccess(true);
    }
  }, [isAuthanticate]);

  if (!hasAccess) {
    return <AppLoader />;
  }

  return (
    <Box>
      <RootStyle>
        <HeaderStyle>
          <Logo />

          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              {pathname === "/register" ? "Already have an account? " : "Don’t have an account?"}
              <Link variant="subtitle2" component={NextLink} href={pathname === "/register" ? "/login" : "/register"}>
                {pathname === "/register" ? "Login" : "Get started"}
              </Link>
            </Typography>
          )}
        </HeaderStyle>
        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              {pathname === "/register" ? "Manage the job more effectively with Minimal" : "Hi, Welcome Back"}
            </Typography>
            <Image
              src={`/static/illustrations/illustration_${pathname === "/register" ? "register" : "login"}.png`}
              alt="login"
              width={480}
              height={360}
            />
          </SectionStyle>
        )}
        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              {pathname === "/register" ? "Get started absolutely free." : "Sign in to Minimal"}
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              {pathname === "/register" ? "Free forever. No credit card needed." : "Enter your details below."}
            </Typography>

            {/* <AuthSocial /> */}
            {children}

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                {pathname === "/register" ? (
                  <>
                    <Typography variant="body2" align="center" sx={{ color: "text.secondary", mt: 3 }}>
                      By registering, I agree to Minimal&nbsp;
                      <Link underline="always" color="text.primary" href="#">
                        Terms of Service
                      </Link>
                      {""}and{""}
                      <Link underline="always" color="text.primary" href="#">
                        Privacy Policy
                      </Link>
                      .
                    </Typography>
                    {"Already have an account?"}
                    <Link variant="subtitle2" component={NextLink} href="/login">
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    {"Don’t have an account? "}
                    <Link variant="subtitle2" component={NextLink} href="/register">
                      Get started
                    </Link>
                  </>
                )}
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Box>
  );
}
