import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { visuallyHidden } from "@mui/utils";
import Container from "@mui/material/Container";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Chip, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { API_URL } from "../../constants/config";

const headCells = [
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "invNo",
    numeric: true,
    disablePadding: false,
    label: "InvNo",
  },
  {
    id: "orderType",
    numeric: false,
    disablePadding: false,
    label: "OrderType",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "orderStatus",
    numeric: false,
    disablePadding: false,
    label: "OderStatus",
  },
  {
    id: "paymentType",
    numeric: false,
    disablePadding: false,
    label: "PaymentType",
  },
  {
    id: "deliveryStatus",
    numeric: false,
    disablePadding: false,
    label: "DeliveryStatus",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleAdd, setRows, rows } = props;
  const [search, setSearch] = React.useState("");
  const handleSerachChange = (e) => {
    setSearch(e.target.value);
    // if (e.target.value === "") {
    //   handleSearch("");
    // } else {
    //   handleSearch(e.target.value);
    // }
  };
  function handleSearch() {
    /* search api, need to server access */

    fetch(`${API_URL}orderlists/`)
      .then((res) => res.json())
      .then((data) => {
        if (search === "") {
          setRows(data);
          return;
        }
        setRows(
          [...rows].filter(
            (r) => r.orderType.includes(search) || r.invNo.includes(search)
          )
        );
      });
  }
  const handleDelete = () => {
    /* delete api, need to server access */

    numSelected.forEach((num) => {
      fetch(`${API_URL}orderlists/${num}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setRows([...rows].filter((row) => row.id !== num)));
    });
  };
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <>
        <Typography
          sx={{ mr: "20px" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          OrderLists {numSelected.length} Selected
        </Typography>
        {numSelected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        <Box>
          <Button sx={{ mr: "5px" }} variant="contained" size="small">
            Today
          </Button>
          <Button sx={{ mr: "5px" }} variant="contained" size="small">
            Week
          </Button>
          <Button sx={{ mr: "5px" }} variant="contained" size="small">
            Month
          </Button>
          <Button sx={{ mr: "5px" }} variant="contained" size="small">
            Full
          </Button>
          <Button sx={{ mr: "15px" }} variant="contained" size="small">
            Back
          </Button>
        </Box>
      </>

      <Box>
        <TextField
          size="small"
          id="outlined-basic"
          label="search"
          variant="outlined"
          value={search}
          onChange={handleSerachChange}
        />
        <Button
          size="medium"
          color="primary"
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{ mr: 2, ml: 2 }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{}}>
        <Button sx={{ mr: 2 }} variant="outlined">
          Export
        </Button>
        <Button variant="contained" onClick={handleAdd}>
          NewRecord
        </Button>
      </Box>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.array.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

export default function OrderTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Date");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = React.useState([]);
  const [modalData, setModalData] = React.useState({
    date: "",
    invNo: 0,
    orderType: "",
    amount: 0,
    orderStatus: "",
    paymentType: "",
    deliveryStatus: "",
  });

  const handleChangeModal = (e) => {
    const newData = { ...modalData, [e.target.name]: e.target.value };
    setModalData(newData);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickUpdate = (row) => {
    setOpen(true);
    setModalData(row);
  };

  const handleClose = () => {
    setOpen(false);
    setModalData({
      date: "",
      invNo: 0,
      orderType: "",
      amount: 0,
      orderStatus: "",
      paymentType: "",
      deliveryStatus: "",
    });
  };

  const handleSubmitModal = () => {
    setOpen(false);
    fetch(`${API_URL}orderlists`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(modalData),
    })
      .then((res) => res.json())
      .then((data) => {
        setModalData({
          date: "",
          invNo: 0,
          orderType: "",
          amount: 0,
          orderStatus: "",
          paymentType: "",
          deliveryStatus: "",
        });
        setRows([...rows, data]);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     ),
  //   [order, orderBy, page, rowsPerPage]
  // );

  React.useEffect(() => {
    fetch(`${API_URL}orderlists`)
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected}
              handleAdd={handleClickOpen}
              setRows={setRows}
              rows={rows}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {rows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          {row.date}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          {row.invNo}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          {row.orderType}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          {row.amount}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          <Chip label={row.orderStatus} color="info" />
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          {row.paymentType}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          <Chip
                            label={row.deliveryStatus}
                            color={
                              row.deliveryStatus === "Processed"
                                ? "default"
                                : "info"
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => handleClickUpdate(row)}
                          >
                            <BorderColorIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>You can create/update your data</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            type="date"
            fullWidth
            variant="standard"
            onChange={handleChangeModal}
            value={modalData.date}
          />
          <TextField
            autoFocus
            margin="dense"
            id="invNo"
            name="invNo"
            label="InvNo"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChangeModal}
            value={modalData.invNo}
          />
          <TextField
            autoFocus
            margin="dense"
            id="orderType"
            name="orderType"
            label="OrderType"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeModal}
            value={modalData.orderType}
          />
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChangeModal}
            value={modalData.amount}
          />
          <TextField
            autoFocus
            margin="dense"
            id="orderStatus"
            name="orderStatus"
            label="OrderStatus"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeModal}
            value={modalData.orderStatus}
          />
          <TextField
            autoFocus
            margin="dense"
            id="paymentType"
            name="paymentType"
            label="PaymentType"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeModal}
            value={modalData.paymentType}
          />
          <TextField
            autoFocus
            margin="dense"
            id="deliveryStatus"
            name="deliveryStatus"
            label="DeliveryStatus"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeModal}
            value={modalData.deliveryStatus}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitModal}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

OrderTable.propTypes = {
  rows: PropTypes.array.isRequired,
};
