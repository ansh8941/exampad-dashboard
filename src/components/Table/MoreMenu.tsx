import { useRef, useState } from "react";
import NextLink from "next/link";

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from "@mui/material";
// component
import Iconify from "../Iconify";

interface Props {
  handleDelete: (slug: string) => void;
  slug: string;
}

export default function MoreMenu(props: Props) {
  const { handleDelete, slug } = props;

  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: "body2" }} onClick={() => handleDelete(slug)} />
        </MenuItem>

        <MenuItem component={NextLink} href="/admin/blog/edit/title" sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: "body2" }} />
        </MenuItem>
      </Menu>
    </>
  );
}
