import * as React from "react";
import { api } from "./API_URL";
import CatListItem from "./components/CatListItem";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
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
        params: {
          limit: 10,
          page
        },
      });
      const data = apiBreeds.data;
      // console.log(getBreeds)
      setGetBreeds(getBreeds.concat(data));
      setPage(page + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const setSearch = async (search) => {
    try {
      let apiSearch = await api.get(`/breeds/search`, {
        params: {
          q: search,
        },
      });
      setGetBreeds(apiSearch.data);
      if (!search) {
        getAllBreeds();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const infiniteScroll = async (event) => {
    console.log(event.target.offsetHeight);
    console.log(event.target.scrollTop);
    console.log(event.target.scrollHeight);

    try {
      if (
        event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight
      ) {
        console.log("scroll to end");
        getAllBreeds();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "#DA8260" }}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              onChange={(ev) => setSearch(ev.target.value)}
              type="text"
            ></StyledInputBase>
          </Search>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ paddingLeft: "60vw" }}
          >
            "Home Is Where the Cat Is"
          </Typography>
        </Toolbar>
      </AppBar>

      <div
        onScroll={infiniteScroll}
        style={{
          maxWidth: "100%",
          backgroundColor: "#F4B9B8",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          position: "relative",
          paddingLeft: "3%",
          paddingRight: "3%",
          paddingTop: "7%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridRowGap: "1vw",
          gridColumnGap: "2vw",
          height: "100vh",
          overflow: "auto",
          boxSizing: "border-box",
          scrollbarWidth: "none",
        }}
      >
        {getBreeds.map((breed) => (
          <CatListItem
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
      </div>
    </>
  );
}
