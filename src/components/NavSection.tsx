import { ReactNode, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
//
import Iconify from "./Iconify";

// ----------------------------------------------------------------------
interface CHILDRENTYPES {
  title: string;
  path: string;
}

interface Itemtypes {
  title: string;
  path: string;
  icon: ReactNode;
  info?: string;
  children?: CHILDRENTYPES[];
}
interface NavItemProps {
  item: Itemtypes;
  active: any;
}

interface ListItemStyleProps {
  onClick?: any;
  key?: string;
  component?: any;
  to?: string;
  sx?: {};
  children: ReactNode;
}

// ----------------------------------------------------------------------

const ListItemStyle = styled((props: ListItemStyleProps) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  flexShrink: 0,
  color: "inherit",
  minWidth: "auto",
  marginRight: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
});

function NavItem({ item, active }: NavItemProps) {
  const theme = useTheme();

  const isActiveRoot = active(item.path, 1);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev: boolean) => !prev);
  };

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemButton component="div">
            <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
            {info && info}
            <Iconify icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"} sx={{ width: 16, height: 16, ml: 1 }} />
          </ListItemButton>
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={NextLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemButton component="div">
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) => theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(2)",
                            bgcolor: "primary.main",
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </ListItemButton>
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={NextLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemButton component="div">
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText disableTypography primary={title} />
        {info && info}
      </ListItemButton>
    </ListItemStyle>
  );
}

interface NavSectionProps {
  navConfig: Itemtypes[];
}

export default function NavSection({ navConfig, ...other }: NavSectionProps) {
  const pathname = usePathname();

  const match = (path: string, node?: number) => {
    let flag = false;
    if (node) {
      flag = pathname.split("/")[node] === path.split("/")[1];
    } else {
      flag = pathname === path;
    }
    return flag;
  };

  return (
    <Box {...other}>
      <List disablePadding sx={{ px: 2 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
