// ** React Imports
import { useState, useEffect, forwardRef } from "react";

// ** Next Import
import Link from "next/link";
import axios from "axios";
// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
// ** Icons Imports
import Send from "mdi-material-ui/Send";
import Check from "mdi-material-ui/Check";
import ArrowUp from "mdi-material-ui/ArrowUp";
import ChartPie from "mdi-material-ui/ChartPie";
import Download from "mdi-material-ui/Download";
import ArrowDown from "mdi-material-ui/ArrowDown";
import EyeOutline from "mdi-material-ui/EyeOutline";
import ChevronDown from "mdi-material-ui/ChevronDown";
import ContentCopy from "mdi-material-ui/ContentCopy";
import DotsVertical from "mdi-material-ui/DotsVertical";
import DeleteOutline from "mdi-material-ui/DeleteOutline";
import PencilOutline from "mdi-material-ui/PencilOutline";
import ContentSaveOutline from "mdi-material-ui/ContentSaveOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";
import InputLabel from "@mui/material/InputLabel";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
// ** Icons Imports
import Close from "mdi-material-ui/Close";
// ** Custom Component Imports
import CustomAvatar from "src/@core/components/mui/cubicmeter";
import { updateProducts } from "src/store/apps/products";
import { top100Films } from "src/@fake-db/autocomplete";
import CardContent from "@mui/material/CardContent";
import Fade from "@mui/material/Fade";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CustomFooterTotalComponent } from "./customFooter.js";

// ** Third Party Imports
import Payment from "payment";
import Cards from "react-credit-cards";

// ** Util Import
import {
  formatCVC,
  formatExpirationDate,
  formatCreditCardNumber,
} from "src/@core/utils/format";

// ** Styled Component Imports
import CardWrapper from "src/@core/styles/libs/react-credit-cards";

// ** Styles Import
import "react-credit-cards/es/styles-compiled.css";

import CreditCardOutline from "mdi-material-ui/CreditCardOutline";
import { PlaylistMinus } from "mdi-material-ui";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.tittle,
});
const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));
const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(3, 4),
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
}));
// ** Vars
const invoiceStatusObj = {
  Sent: { color: "secondary", icon: <Send sx={{ fontSize: "1.25rem" }} /> },
  Paid: { color: "success", icon: <Check sx={{ fontSize: "1.25rem" }} /> },
  Draft: {
    color: "primary",
    icon: <ContentSaveOutline sx={{ fontSize: "1.25rem" }} />,
  },
  "Partial Payment": {
    color: "warning",
    icon: <ChartPie sx={{ fontSize: "1.25rem" }} />,
  },
  "Past Due": {
    color: "error",
    icon: <InformationOutline sx={{ fontSize: "1.25rem" }} />,
  },
  Downloaded: {
    color: "info",
    icon: <ArrowDown sx={{ fontSize: "1.25rem" }} />,
  },
};



const InvoiceListTable = ({ invoiceData, movingdata, id }) => {
  // ** State
  const [pageSize, setPageSize] = useState(7);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pdata, setpdata] = useState([]);
  const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
  const [mlist, setmlist] = useState([]);
  const [refreshdata, setrefreshdata] = useState(true);
  const [show, setShow] = useState(false);
    const [dialogType, setdialogType] = useState("add");
  // ** Var
  const open = Boolean(anchorEl);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [proname, setproname] = useState("");
  const [proqty, setproqty] = useState("");
  const [proid, setproid] = useState("");
  
  
  



  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpen = (event) => {
    setAddUserOpen(true);
  };

  const columns = [
    {
      flex: 0.2,
      field: "id",
      minWidth: 90,
      headerName: "#ID",

      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>
            <Typography></Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>
            <StyledLink>#{row.ms_id}</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "title",
      minWidth: 90,
      headerName: "#Title",

      renderCell: ({ row }) => {
       
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography variant="h6" sx={{ p: 2 }} color="common.black">
              {row.tittle}
            </Typography>

            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>
            <StyledLink>{row.tittle}</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "price",
      minWidth: 90,
      headerName: "Price",

      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography variant="h6" sx={{ p: 2 }} color="common.black">
              {row.price}€
            </Typography>

            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>
            <StyledLink>{row.price}€</StyledLink>
            // </Link>
          );
        }
      },
    },
    /*{
      flex: 0.15,
      minWidth: 80,
      field: "Price",
      headerName: "yes",
      renderHeader: () => (
        <Box>
          <Typography variant="caption">Price</Typography>
        </Box>
      ),
      renderCell: ({ row }) => {
        const { dueDate, balance, invoiceStatus, size } = row;
        const color = invoiceStatusObj[invoiceStatus]
          ? invoiceStatusObj[invoiceStatus].color
          : "primary";
        const Icon = invoiceStatusObj[invoiceStatus]
          ? invoiceStatusObj[invoiceStatus].icon
          : null;
        if (row.tittle == "Total") {
          return (
            <Typography color="common.black">
              {size.cubic_meter} m<sup style={{ width: 45, height: 40 }}>3</sup>
            </Typography>
          );
        } else {
          return (
            <Tooltip
              title={
                <>
                  <Typography
                    variant="caption"
                    sx={{ color: "common.white", fontWeight: 600 }}
                  >
                    {invoiceStatus}
                  </Typography>
                  <br />
                  <Typography
                    variant="caption"
                    sx={{ color: "common.white", fontWeight: 600 }}
                  >
                    Length:
                  </Typography>{" "}
                  {size.length}
                  <br />
                  <Typography
                    variant="caption"
                    sx={{ color: "common.white", fontWeight: 600 }}
                  >
                    Breath:
                  </Typography>{" "}
                  {size.breath}
                  <br />
                  <Typography
                    variant="caption"
                    sx={{ color: "common.white", fontWeight: 600 }}
                  >
                    height:
                  </Typography>{" "}
                  {size.height}
                  <br />
                </>
              }
            >
              <StyledLink
              // skin="light-static"
              // color={color}
              // sx={{ width: 75, height: 70 }}
              >
                {size.cubic_meter} m
                <sup style={{ width: 45, height: 40 }}>3</sup>
              </StyledLink>
            </Tooltip>
          );
        }
      },
    },*/
    {
      flex: 0.2,
      field: "qty",
      minWidth: 90,
      headerName: "Quantity",
      renderCell: ({ row }) => {
        var qty_new;
        var qtysum;

        if (row.tittle == "Total") {
          qty_new = 0;
          qtysum = row.size.qty;
        } else {
          var qty_new = qty(row.ms_id);

          if (qty_new.length != 0) {
           
            var qty_new = qty(row.ms_id);
            qty_new = qty_new[0].quantity;
            qtysum = qty_new;
          }
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>
            <Typography color="common.black">{qtysum}</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>
            <StyledLink>{qtysum}</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "totalcubicmeter",
      minWidth: 90,
      headerName: "Total",
      renderCell: ({ row }) => {
        var qty_new;
        var totalcubicsum;
        if (row.tittle == "Total") {
          qty_new = 0;
          var qtysum = row.qty;
          qtysum = row.size.qty;
          totalcubicsum = (parseFloat(row.price) * parseFloat(qtysum)).toFixed(2);
        } else {
          var qty_new = qty(row.ms_id);
          if (qty_new.length != 0) 
          {
            qty_new = qty_new[0].quantity;

            totalcubicsum = (parseFloat(row.price) * parseFloat(qty_new)).toFixed(2);
          }
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{totalcubicsum} €</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>{totalcubicsum} €</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => {
        if (row.tittle != "Total") {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => {
                    setproid(row.ms_id);
                    setproname(row.tittle);
                    var qty_new = qty(row.ms_id);
                    qty_new = qty_new[0].quantity;
                    setproqty(qty_new);
                    setdialogType("edit");
                    setShow(true);
                  }}
                >
                  <PencilOutline />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Invoice">
                <IconButton
                  size="small"
                  onClick={() => {
                    handleDelete(row);
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </Tooltip>

              {/* <RowOptions id={row.id} /> */}
            </Box>
          );
        }
      },
    },
  ];
  async function updateProducts(someArray) {
    var datanew = {
      moving_services_list: someArray,
      c_id: "c" + id,
    };

    const response = await axios.post(
      "https://umzungcrmtest.vercel.app/api/updateAdminLeadMovingMaterails",
      {
        datanew,
      }
    );
    //console.log(response);
    if (response.status == 200) {
      setrefreshdata(true);
    }
  }
  const handleDelete = (row) => {
    //console.log("delete");

    //console.log(mlist);
    let someArray = mlist.filter((p_list) => p_list.ms_id != row.ms_id);
    //moving_material_list;
    //console.log(someArray);
    updateProducts(someArray);

    //dispatch(deleteUser(ms_id));
    //handleRowOptionsClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    var ids = { id: "c" + id };

    axios
      .post("https://umzungcrmtest.vercel.app/api/getLeadAdminbyid", { ids })
      .then((response) => {
        var datas = response.data[0];
        //console.log(datas);
        setmlist(datas.moving_services_list);
        //setloaddata(true);
        setrefreshdata(false);
      })
      .catch(() => {
        setData(null);
        //setloaddata(false);
      });
    //console.log(mlist);
  }, [refreshdata]);

  useEffect(() => {
    if (movingdata.length != 0) {
      if (mlist.length != 0) {
        let yFilter = mlist.map((itemY) => {
          return itemY.ms_id;
        });

        let filteredX = movingdata.filter((itemX) =>
          yFilter.includes(itemX.ms_id)
        );

        setpdata(filteredX);

        // traveler.map(amount).reduce(sum);
        // => 235;

        // or use arrow functions
        var sums = filteredX
          .map((item) => parseInt(item.price))
          .reduce((prev, next) => prev + next);

          //* parseFloat(qty(item.ms_id).quantity); 

        var sumQty = mlist
          .map((item) => parseInt(item.quantity))
          .reduce((prev, next) => prev + next);

        var a = {
          tittle: "Total",
          size: {
            length: "0",
            breath: "0",
            height: "0",
            cubic_meter: sums,
            qty: sumQty,
          },
          price:sums,
          
          ms_id: "",
        };
        setpdata([...filteredX]);
        
      }
    }
  }, [mlist, refreshdata]);
  function qty(id) {
    return mlist.filter((itemY) => {
      if (itemY.ms_id == id) {
        return itemY;
      } else {
        return null;
      }
    });
  }
  function qtynm(id) {
    var q;
     mlist.filter((itemY) => {
      
      if (itemY.ms_id == id) {
        q=itemY.quantity
        return itemY;
      } else {
        return null;
      }
    });
    return parseInt(q);
  }
  const DialogAddCard = ({ pronamed, proqtyd,proidd }) => {
    // ** States
    const [proname, setproname] = useState(pronamed);
  
    
    const [cardNumber, setCardNumber] = useState("");
    const handleBlur = () => setFocus(undefined);

    const [pid, setpid] = useState(proidd);
    const [pname, setpname] = useState("");
    const [qty, setqty] = useState(proqtyd);
    

    const handleClose = () => {
      setShow(false);
      setpid("");
      setpname("");
    };
    const handlesubmit = () => {
      //setShow(false);

      pushproduct(pid, qty);
      setpid("");
      setpname("");
    };
    async function pushproduct(pid, qty) {
      let objIndex = mlist.findIndex((obj) => obj.ms_id == pid);
      //console.log(objIndex);

      if (objIndex == -1) {
        mlist.push({ ms_id: pid, quantity: qty });
        var datanew = {
          moving_services_list: mlist,
          c_id: "c" + id,
        };
        const response = await axios.post(
          "https://umzungcrmtest.vercel.app/api/updateAdminLeadMovingMaterails",
          {
            datanew,
          }
        );
        //console.log(response);
        if (response.status == 200) {

          setrefreshdata(true);
          setShow(false)
        }
      } else {
        mlist.splice(objIndex, 1);
        mlist.push({ ms_id: pid, quantity: qty });
        var datanew = {
          moving_services_list: mlist,
          c_id: "c" + id,
        };
        const response = await axios.post(
          "https://umzungcrmtest.vercel.app/api/updateAdminLeadMovingMaterails",
          {
            datanew,
          }
        );
        //console.log(response);
        if (response.status == 200) {
          setrefreshdata(true);
        setShow(false);
        }
      }
    }

    return (
      <>
        <Button
          variant="contained"
          sx={{ mb: 3 }}
          aria-expanded={open ? "true" : undefined}
          aria-controls={open ? "user-view-overview-export" : undefined}
          onClick={() => {
            setqty("");
            setdialogType("add");
            setShow(true);
          }}
        >
          Add
        </Button>
        <Card>
          <Dialog
            fullWidth
            open={show}
            maxWidth="sm"
            scroll="body"
            onClose={handleClose}
            onBackdropClick={handleClose}
            TransitionComponent={Transition}
          >
            <DialogContent
              sx={{
                pb: 6,
                px: { xs: 8, sm: 15 },
                pt: { xs: 8, sm: 12.5 },
                position: "relative",
              }}
            >
              <IconButton
                size="small"
                onClick={handleClose}
                sx={{ position: "absolute", right: "1rem", top: "1rem" }}
              >
                <Close />
              </IconButton>
              <Box sx={{ mb: 4, textAlign: "center" }}>
                {dialogType == "add" ? (
                  <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                    Add
                  </Typography>
                ) : (
                  <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                    Edit
                  </Typography>
                )}

                <Typography variant="body2"></Typography>
              </Box>
              <Grid container spacing={6}>
                <Grid
                  item
                  xs={12}
                  sx={{ pt: (theme) => `${theme.spacing(5)} !important` }}
                >
                  <Grid container spacing={6}>
                    <Grid item xs={12} sx={{ mt: 7 }}>
                      {dialogType == "add" ? (
                        <Autocomplete
                          sx={{
                            lineHeight: "32px !important",
                            letterSpacing: "0.15px !important",
                            pl: 20,
                            pr: 20,
                            pt: 10,
                          }}
                          options={movingdata}
                          onChange={(event, newValue) => {
                            setpid(newValue.ms_id);
                          }}
                          inputValue={pname}
                          onInputChange={(event, newInputValue) => {
                            setpname(newInputValue);
                          }}
                          filterOptions={filterOptions}
                          id="autocomplete-custom-filter"
                          getOptionLabel={(option) => option.tittle}
                          renderInput={(params) => (
                            <TextField {...params} label="Add" />
                          )}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          sx={{ mt: 5 }}
                          value={proname}
                          disabled
                          //onBlur={handleBlur}
                          label="Product Name"
                          placeholder="Name"
                          
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        name="name"
                        type="number"
                        value={qty}
                        autoComplete="off"
                        
                        label="Quantity"
                        placeholder="1"
                        onChange={(e) => setqty(e.target.value)}
                        //onFocus={(e) => setFocus(e.target.name)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions
              sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: "center" }}
            >
              <Button variant="contained" sx={{ mr: 2 }} onClick={handlesubmit}>
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </>
    );
  };
  return (
    <Card>
      <CardHeader
        title="Moving Services List"
        sx={{ "& .MuiCardHeader-action": { m: 0 } }}
        titleTypographyProps={{
          variant: "h6",
          sx: {
            lineHeight: "32px !important",
            letterSpacing: "0.15px !important",
          },
        }}
        action={
          <>
            <DialogAddCard pronamed={proname} proqtyd={proqty} proidd={proid} />
          </>
        }
      />
      <Box
        sx={{
          height: 300,
          width: "100%",
          "& .cold": {
            backgroundColor: "#b9d5ff91",
            color: "#1a3e72",
          },
          "& .hot": {
            backgroundColor: "#ff943975",
            color: "#1a3e72",
          },
        }}
      >
        {" "}
        <DataGrid
          autoHeight
          getRowId={(row) => row.ms_id}
          columns={columns}
          rows={pdata}
          pageSize={pageSize}
          getCellClassName={(params) => {
            if (params.row.tittle == "Total") {
              return "cold";
            }
          }}
          componentsProps={{
            footer: { total },
          }}
          components={{
            Footer: CustomFooterTotalComponent,
          }}
          disableSelectionOnClick
          onStateChange={(state) => {
            var q = qtynm("ms1");
            const total = pdata
              .map((item) => item.price * qtynm(item.ms_id))
              .reduce((a, b) => a + b, 0);

            setTotal(total);
          }}
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
        />
      </Box>
    </Card>
  );
};

export default InvoiceListTable;
