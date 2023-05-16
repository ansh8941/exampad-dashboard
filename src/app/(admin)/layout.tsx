"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { AppLoader } from "@/components/loader";
import { useGetAuthProfileQuery } from "@/redux/features/profile/api";

import { useAppSelector } from "@/redux/hooks";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isFetching } = useGetAuthProfileQuery();

  const [open, setOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const { isAuthanticate } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthanticate) {
      router.push("/login");
    } else {
      setHasAccess(true);
    }
  }, [isAuthanticate, router]);

  if (!hasAccess || isFetching) {
    return <AppLoader />;
  }

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
}
