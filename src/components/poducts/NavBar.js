import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { API_URL } from "../../constants/config";
import { useSelector, useDispatch } from "react-redux";
import * as ProductActions from "../../redux/actions/productActions";

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

export default function NavBar({ style, matches }) {
  const [search, setSerach] = React.useState("");
  const dispatch = useDispatch();
  const showProduct = useSelector((state) => state.product.showProduct);

  const handleChange = (e) => {
    setSerach(e.target.value);
  };
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      /* here is search side, if i know ur backend, i will correct soon */
      fetch(`${API_URL}products`)
        .then((res) => res.json())
        .then((data) => {
          const newProduct = data.filter((d) => d.name === search);
          dispatch(ProductActions.addShowProduct(newProduct));
        });
    }
    return;
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: matches ? "100%" : "calc(100vw - 480px)",
        position: matches ? "unset" : "absolute",
        top: 18,
        left: 160,
        ...style,
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <p>Items: {showProduct.length}</p>
          <Search sx={{ border: "black 1px solid" }} onKeyUp={handleSearch}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={search}
              onChange={handleChange}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ "& button": { m: 1 } }}>
            <Button variant="outlined" size="small" color="inherit">
              Back
            </Button>
            <Button variant="outlined" size="small" color="inherit">
              OrderWorkIn
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              href="/orderlists"
            >
              Orders
            </Button>
            <Button variant="contained" size="small">
              CustomerSetting
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
