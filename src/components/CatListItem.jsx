import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CheckCircle, Place, FlagCircle, Pets } from "@mui/icons-material";
import {
  Box,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { API_IMG } from "../API_URL";

const BEIGE = "#E9E6E0";
const RADIUS = "12px";
const PLACEHOLDER =
  "https://cnpspca.org/wp-content/uploads/2020/07/Placeholder_Cat.png";

export default function CatListItem({
  catname,
  catid,
  origin,
  ccode,
  image,
  desc,
  temper,
  wimperial,
  wmetric,
  lifespan,
  wikipedia,
}) {
  const [open, setOpen] = React.useState(true);

  const setpict = image == null ? PLACEHOLDER : `${API_IMG}${image}.jpg`;

  return (
    // No background on this wrapper: the beige belongs to the header and to
    // the Collapse separately, so the Collapse's background rolls up with it.
    <Box sx={{ minWidth: 0 }}>
      {/* Top part: always visible */}
      <Box
        sx={{
          backgroundColor: BEIGE,
          // Square bottom corners while the panel is attached, round when folded
          borderRadius: open ? `${RADIUS} ${RADIUS} 0 0` : RADIUS,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: 1,
          p: 1,
          transition: "border-radius 0.3s",
        }}
      >
        <CardMedia
          component="img"
          image={setpict}
          alt={catname}
          sx={{
            width: { xs: "100%", sm: 160, md: 200 },
            height: { xs: 220, sm: 160, md: 200 },
            flexShrink: 0,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
        <CardContent sx={{ flex: 1, minWidth: 0, p: { xs: 0, sm: 1 } }}>
          <ListItem disableGutters sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Pets />
            </ListItemIcon>
            <ListItemText
              primary={<b>{catname}</b>}
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItem>
          <ListItem disableGutters sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <CheckCircle />
            </ListItemIcon>
            <Typography>Id: {catid}</Typography>
          </ListItem>
          <ListItem disableGutters sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Place />
            </ListItemIcon>
            <Typography>Origin: {origin}</Typography>
          </ListItem>
          <ListItem disableGutters sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <FlagCircle />
            </ListItemIcon>
            <Typography>Country Code: {ccode}</Typography>
          </ListItem>
        </CardContent>
        <IconButton
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? `Fold ${catname}` : `Unfold ${catname}`}
          sx={{ alignSelf: { xs: "flex-end", sm: "center" } }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {/* Bottom panel: its own beige background rolls up with it */}
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          backgroundColor: BEIGE,
          borderRadius: `0 0 ${RADIUS} ${RADIUS}`,
        }}
      >
        <Box sx={{ px: { xs: 1.5, sm: 2 }, py: 2 }}>
          <Typography sx={{ mb: 0.5 }}>
            <b>Description:</b> {desc}
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <b>Temper:</b> {temper}
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <b>Weight:</b> Imperial {wimperial}, Metric {wmetric}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <b>Lifespan:</b> {lifespan}
          </Typography>
          <Button
            size="small"
            href={wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={{
              backgroundColor: "#DCA780",
              "&:hover": { backgroundColor: "#DA8260" },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}
