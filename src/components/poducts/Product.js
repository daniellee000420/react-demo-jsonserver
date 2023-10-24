import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Products({ pid, name, image, price, setSelectedCate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedCate(pid);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Card sx={{ maxWidth: 80, mt: 5 }}>
        <CardActionArea onClick={handleClick}>
          {image === "All" ? null : (
            <CardMedia
              component="img"
              height="40"
              image={image}
              alt="green iguana"
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="p" component="div">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
