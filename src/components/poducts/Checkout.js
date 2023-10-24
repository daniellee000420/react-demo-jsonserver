import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as ProductActions from "../../redux/actions/productActions";

const Checkout = ({ style, matches }) => {
  // const [checked, setChecked] = React.useState([]);
  const dispatch = useDispatch();

  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  const handleToggle = (value) => () => {
    dispatch(ProductActions.removeCart(value));
  };

  const CPaper = styled(Paper)(({ theme }) => ({
    position: matches ? "unset" : "absolute",
    right: 0,
    top: matches ? 0 : 10,
    width: 230,
    margin: theme.spacing(1),
    minHeight: "calc(100vh - 100px)",
    padding: theme.spacing(3),
    ...theme.typography.body2,
    textAlign: "center",
    boxShadow: "0px 0px 1px 1px #303030",
    ...style,
  }));

  return (
    <CPaper elevation={0}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "Search" }}
          size="small"
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: "10px" }} aria-label="directions">
          <NoteAddOutlinedIcon />
        </IconButton>
      </Paper>

      <Paper
        sx={{
          m: "15px 0px",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            height: "calc(100vh - 500px - 48px)",
            bgcolor: "background.paper",
            overflow: "auto",
          }}
        >
          {selectedProduct.map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem key={value} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <IconButton edge="end" aria-label="comments">
                      <Badge badgeContent={1} color="primary">
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <Paper
        sx={{
          p: "0px 4px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>SubTotal</p>
          <p>0.00</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Disc % or #</p>
          <p>0.00</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>DeliveryCharge</p>
          <p>0.00</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>
            <b>Total</b>
          </p>
          <p>0.00</p>
        </div>

        <div>
          <Button size="small" disabled>
            Place
          </Button>
          <Button size="small" disabled>
            COD
          </Button>
          <Button size="small" disabled>
            Draft
          </Button>
        </div>
        <div>
          <Button size="small" disabled>
            Payment
          </Button>
          <Button size="small" color="success">
            Charge
          </Button>
          <Button size="small" color="secondary">
            Cancel
          </Button>
        </div>
      </Paper>
      <Paper
        sx={{
          mt: 2,
          p: "0px 4px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button>0.00</Button>
        <Button disabled>0.00</Button>
      </Paper>
    </CPaper>
  );
};

export default Checkout;
