import React, { useEffect, useMemo, useState } from "react";
import ProductBoard from "../../components/poducts/ProductBoard";
import { API_URL } from "../../constants/config";
import NavBar from "../../components/poducts/NavBar";
import Checkout from "../../components/poducts/Checkout";
import { Grid, styled, useMediaQuery, useTheme, Paper } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Products = () => {
  const [productData, setProductData] = useState([]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const board = useMemo(
    () => <ProductBoard productData={productData} />,
    [productData]
  );

  // const visibleNavbar = useMemo(
  //   () => <NavBar/>,
  //   [productData]
  // );

  useEffect(() => {
    fetch(`${API_URL}cate`)
      .then((res) => res.json())
      .then((data) => setProductData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {matches ? (
        <div style={{ position: "relative" }}>
          {board}
          <NavBar />
          <Checkout />
        </div>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <NavBar style={{ position: "unset" }} matches={{ matches }} />
            </Grid>
            <Grid item lg={12} md={8} sm={12} xs={12}>
              <ProductBoard
                productData={productData}
                style={{ position: "unset" }}
                matches={matches}
              />
            </Grid>
            <Grid
              item
              lg={12}
              md={4}
              sm={12}
              xs={12}
              style={{ float: "right" }}
            >
              <Checkout style={{ position: "unset" }} matches={matches} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Products;
