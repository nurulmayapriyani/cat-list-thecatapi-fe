import * as React from "react";
import { api } from "./API_URL";
import CatListItem from "./components/CatListItem";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, Box } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  flexShrink: 0,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "12ch",
    "&:focus": {
      width: "18ch",
    },
    [theme.breakpoints.up("md")]: {
      width: "16ch",
      "&:focus": {
        width: "24ch",
      },
    },
  },
}));

export default function App() {
  const [getBreeds, setGetBreeds] = React.useState([]);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    getAllBreeds();
  }, []);

  const getWikiUrl = (breed) =>
    breed.wikipedia_url ||
    `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(
      `${breed.name} cat`
    )}`;

  const getAllBreeds = async () => {
    try {
      const apiBreeds = await api.get(`/breeds`, {
        params: { limit: 10, page },
      });
      setGetBreeds(getBreeds.concat(apiBreeds.data));
      setPage(page + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const setSearch = async (search) => {
    try {
      const apiSearch = await api.get(`/breeds/search`, {
        params: { q: search },
      });
      setGetBreeds(apiSearch.data);
      if (!search) {
        getAllBreeds();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const infiniteScroll = (event) => {
    const { offsetHeight, scrollTop, scrollHeight } = event.currentTarget;
    // 100px threshold: exact equality is unreliable on mobile/zoomed screens
    if (offsetHeight + scrollTop >= scrollHeight - 100) {
      getAllBreeds();
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#DA8260" }}>
        <Toolbar sx={{ gap: 2 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              onChange={(ev) => setSearch(ev.target.value)}
              type="text"
            />
          </Search>
          <Typography
            noWrap
            component="div"
            sx={{
              ml: "auto",
              minWidth: 0,
              textAlign: "right",
              fontWeight: 500,
              fontSize: { xs: "0.85rem", sm: "1.1rem", md: "1.25rem" },
              // Too cramped next to the search box on very small phones
              display: { xs: "none", sm: "block" },
            }}
          >
            "Home Is Where the Cat Is"
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        onScroll={infiniteScroll}
        sx={{
          backgroundColor: "#F4B9B8",
          display: "grid",
          // 1 column on phones, 2 on tablets/desktop, 3 on very wide screens
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 2, md: 3 },
          height: "100dvh",
          overflowY: "auto",
          boxSizing: "border-box",
          px: { xs: 1.5, sm: 3, md: "3%" },
          pt: { xs: 9, sm: 10 }, // clears the fixed AppBar (56px / 64px) + gap
          pb: 3,
          alignContent: "start",
          // Without this, rows can shrink to fit the fixed container height
          gridAutoRows: "max-content",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {getBreeds.map((breed) => (
          <CatListItem
            key={breed.id}
            catname={breed.name}
            catid={breed.id}
            origin={breed.origin}
            ccode={breed.country_code}
            image={breed.reference_image_id}
            desc={breed.description}
            temper={breed.temperament}
            wimperial={breed.weight?.imperial}
            wmetric={breed.weight?.metric}
            lifespan={breed.life_span}
            wikipedia={getWikiUrl(breed)}
          />
        ))}
      </Box>
    </>
  );
}
