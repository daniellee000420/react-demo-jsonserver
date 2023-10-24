import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Product from "./Product";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { API_URL } from "../../constants/config";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as ProductActions from "../../redux/actions/productActions";
import Grid from "@mui/material/Grid";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const ProductBoard = ({ productData, style, matches }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.showProduct);
  const [selectedCate, setSelectedCate] = useState(null);
  // const [products, setProducts] = useState([]);

  const CPaper = styled(Paper)(({ theme }) => ({
    position: matches ? "unset" : "absolute",
    left: 0,
    top: matches ? 0 : 18,
    width: 80,
    margin: theme.spacing(1),
    minWidth: matches ? "100%" : "unset",
    minHeight: "calc(100vh - 100px)",
    padding: theme.spacing(3),
    ...theme.typography.body2,
    textAlign: "center",
    boxShadow: "0px 0px 1px 1px #303030",
  }));

  const handleAddCart = (name) => {
    dispatch(ProductActions.addCart(name));
  };

  useEffect(() => {
    fetch(`${API_URL}products`)
      .then((res) => res.json())
      .then((data) => {
        if (selectedCate === null) {
          return;
        }
        if (selectedCate === "all") {
          dispatch(ProductActions.addShowProduct(data));
          return;
        } else {
          const newProduct = data.filter((p) => p.cate === selectedCate);
          dispatch(ProductActions.addShowProduct(newProduct));
          return;
        }
      });
  }, [selectedCate, dispatch]);

  return (
    <div style={{ ...style }}>
      <CPaper
        elevation={0}
        style={{ position: matches ? "unset" : "relative" }}
      >
        <p>Categories</p>
        <Product
          pid={"all"}
          name={"All"}
          image={"All"}
          setSelectedCate={setSelectedCate}
        />
        {productData.length === 0
          ? null
          : productData.map((p, idx) => (
              <Product
                key={p.id}
                pid={p.id}
                name={p.name}
                image={p.image}
                price={p.price}
                setSelectedCate={setSelectedCate}
              />
            ))}
      </CPaper>
      <Grid
        container
        spacing={2}
        style={{
          width: matches ? "100%" : "revert-layer",
        }}
        sx={{
          position: matches ? "unset" : "absolute",
          top: 100,
          left: 160,
          width: matches ? "100%" : "calc(100vw - 480px)",
        }}
      >
        {products.map((p, i) => (
          <Grid
            key={i}
            item
            lg={4}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                display: "flex",
              }}
              key={p.id}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: matches ? "100%" : 300,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 60, p: 5 }}
                    image={p.image}
                    alt="product img"
                  />
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {p.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      ${p.price}
                    </Typography>
                  </CardContent>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    aria-label="buy"
                    size="large"
                    variant="outlined"
                    onClick={() => handleAddCart(p.name)}
                    sx={{ p: "5px", m: "5px", width: "100%" }}
                  >
                    ADD CART
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

ProductBoard.propTypes = {
  productData: PropTypes.array.isRequired,
};

export default ProductBoard;
