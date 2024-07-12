import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Drawer, IconButton, styled } from "@mui/material";
import { ReactNode } from "react";

interface SidebarProps {
  anchor?: "bottom" | "left" | "right" | "top";
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode[];
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const Sidebar = (props: SidebarProps) => {
  const { anchor, isOpen, onClose, children } = props;

  const getCloseButton = (anchor: "bottom" | "left" | "right" | "top") => {
    if (anchor === "bottom") return <ExpandMoreIcon fontSize="large" />;
    if (anchor === "top") return <ExpandLessIcon fontSize="large" />;
    if (anchor === "left") return <ChevronLeft fontSize="large" />;
    if (anchor === "right") return <ChevronRight fontSize="large" />;
  };

  return (
    <Drawer
      anchor={anchor ? anchor : "left"}
      variant="persistent"
      hideBackdrop={true}
      open={isOpen}
    >
      <DrawerHeader sx={{ position: "relative", width: "100%" }}>
        <IconButton sx={{ position: "absolute", left: "0" }} onClick={onClose}>
          {getCloseButton(anchor ? anchor : "left")}
        </IconButton>
      </DrawerHeader>
      <Box sx={{ height: "100%", width: 240, p: 3 }}>{children}</Box>
    </Drawer>
  );
};

export default Sidebar;
