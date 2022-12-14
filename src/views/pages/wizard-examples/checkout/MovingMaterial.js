// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import Checkbox from "@mui/material/Checkbox";
// ** Next Import
import Link from "next/link";
import axios from "axios";
// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";
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
import { top100Films } from "src/@fake-db/autocomplete";
import CardContent from "@mui/material/CardContent";
import Fade from "@mui/material/Fade";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CustomFooterTotalComponent } from "./customFooterMaterial.js";

// ** Third Party Imports
import Payment from "payment";
import Cards from "react-credit-cards";




import "react-credit-cards/es/styles-compiled.css";


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


const MovingMaterial = ({ invoiceData, movingdata, id }) => {
  // ** State
  const [pageSize, setPageSize] = useState(7);
  const [qtyproduct, setqtyproduct] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [pdata, setpdata] = useState([]);
  const [data, setData] = useState([]);
  const [mlist, setmlist] = useState([]);
  const [show, setShow] = useState(false);
  const [prodcutname, setprodcutname] = useState("");
  const [pqty, setpqty] = useState("");
  const [pname, setpname] = useState("");
  const [total, setTotal] = useState(0.00);
   const [ctotal, setCtotal] = useState(0.00);
  const [pid, setpid] = useState("");

  const [dialogType, setdialogType] = useState("add");

  const [refreshdata, setrefreshdata] = useState(true);
  // ** Var
  const open = Boolean(anchorEl);
  const [addUserOpen, setAddUserOpen] = useState(false);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpen = (event) => {
    setAddUserOpen(true);
  };

  const columns = [
    {
      flex: 0,
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
            <Typography
              noWrap
              component="a"
              variant="subtitle2"
              sx={{ color: "text.primary", textDecoration: "none" }}
            >
              #{row.mm_id}
            </Typography>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0,
      field: "qty",
      minWidth: 90,
      headerName: "",
      renderCell: ({ row }) => {
        var qty_new;
        var qtysum;

        if (row.tittle == "Total") {
          qty_new = 0;
          qtysum = row.size.qty;
        } else {
          var qty_new = qty(row.mm_id);

          if (qty_new.length != 0) {
            //console.log(row)
            var qty_new = qty(row.mm_id);
            qty_new = qty_new[0].quantity;
            qtysum = qty_new;
          }
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>qtysum
            <Typography color="common.black">{}</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>
            <Typography
              noWrap
              component="a"
              variant="subtitle2"
              sx={{ color: "text.primary", textDecoration: "none" }}
            >
              {qtysum}x
            </Typography>
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
          const { dueDate, balance, invoiceStatus, size } = row;
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                {/* <Link href={`/apps/products/view/${mm_idnew}`} passHref> */}
                <Typography
                  noWrap
                  component="a"
                  variant="subtitle2"
                  sx={{ color: "text.primary", textDecoration: "none" }}
                >
                  {row.tittle}
                </Typography>
                {/* </Link> */}
                {/* <Link href={`/apps/products/view/${mm_idnew}`} passHref> */}
                <Typography
                  noWrap
                  component="a"
                  variant="caption"
                  sx={{ textDecoration: "none" }}
                >
                  <Tooltip
                    title={
                      <>
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
                </Typography>
                {/* </Link> */}
              </Box>
            </Box>
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            // </Link>
          );
        }
      },
    },

    {
      flex: 0.2,
      field: "totalcubicmeter",
      minWidth: 90,
      headerName: "Total Cubic meter",
      renderCell: ({ row }) => {
        var qty_new;
        var totalcubicsum;
        if (row.tittle == "Total") {
          qty_new = 0;
          var qtysum = row.size.qty;
          totalcubicsum = parseFloat(row.size.cubic_meter) * parseFloat(qtysum);
        } else {
          var qty_new = qty(row.mm_id);
          if (qty_new.length != 0) {
            qty_new = qty_new[0].quantity;

            totalcubicsum =
              parseFloat(row.size.cubic_meter) * parseFloat(qty_new);
          }
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography
              color="common.black"
              sx={{ fontWeight: "bold", fontSize: 19 }}
            >
              {totalcubicsum.toFixed(2)} m
              <sup style={{ width: 45, height: 40 }}>3</sup>
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>
              {parseFloat(totalcubicsum).toFixed(2)} m
              <sup style={{ width: 45, height: 40 }}>3</sup>
            </StyledLink>
            // </Link>
          );
        }
      },
    },

   
    {
      flex: 0.2,
      field: "Total Price",
      minWidth: 90,
      headerName: "total Materials price",
      renderCell: ({ row }) => {
        var sumtotal;
        var qty_new;
        var qtysum;

       
        if (row.tittle == "Total") {
          sumtotal = row.price;
        }
        else
        {
          var qty_new = qty(row.mm_id);

          if (qty_new.length != 0) {
            //console.log(row)
            var qty_new = qty(row.mm_id);
            qty_new = qty_new[0].quantity;
            qtysum = qty_new;
          }
          sumtotal = parseFloat(row.price) * parseFloat(qtysum);
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography
              color="common.black"
              sx={{ fontWeight: "bold", fontSize: 19 }}
            >
              {sumtotal} ???
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography
              noWrap
              component="a"
              variant="subtitle2"
              sx={{ color: "text.primary", textDecoration: "none" }}
            >
              {sumtotal} ???
            </Typography>
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
                    setprodcutname(row.tittle);
                    var qty_new = qty(row.mm_id);
                    qty_new = qty_new[0].quantity;

                    setpqty(qty_new);

                    setpid(row.mm_id);
                    setpname(row.tittle);
                    setdialogType("edit");
                    

                   

                    setShow(true);
                  }}
                >
                  <PencilOutline />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
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
      moving_material_list: someArray,
      c_id: "c" + id,
    };

    const response = await axios.post(
      "https://umzungcrmtest.vercel.app/api/updateAdminLeadMoving",
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
    let someArray = mlist.filter((p_list) => p_list.mm_id != row.mm_id);
    //moving_material_list;
    //console.log(someArray);
    updateProducts(someArray);

    //dispatch(deleteUser(mm_id));
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
        setmlist(datas.moving_material_list);
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
          return itemY.mm_id;
        });

        let filteredX = movingdata.filter((itemX) =>
          yFilter.includes(itemX.mm_id)
        );

        setpdata(filteredX);

        // traveler.map(amount).reduce(sum);
        // => 235;

        // or use arrow functions
        var sums = filteredX
          .map((item) => parseFloat(item.size.cubic_meter))
          .reduce((prev, next) => prev + next);

        var sumQty = mlist
          .map((item) => parseInt(item.quantity))
          .reduce((prev, next) => prev + next);

        /*var sumDissasembly = filteredX
          .map((item) => parseInt(item.service_price.dissasembly))
          .reduce((prev, next) => prev + next);*/

        

        //console.log(sumDissasembly);

        var a = {
          tittle: "Total",
          size: {
            length: "0",
            breath: "0",
            height: "0",
            cubic_meter: parseFloat(sums).toFixed(2),
            qty: sumQty,
          },
         

          mm_id: "",
        };
        setpdata([...filteredX]);
        //console.log(pdata);
      }
    }
  }, [mlist, refreshdata]);
  function qty(id) {
    return mlist.filter((itemY) => {
      if (itemY.mm_id == id) {
        return itemY;
      } else {
        return null;
      }
    });
  }

  
  function service(id) {
    return mlist.filter((itemY, service) => {
      if (itemY.mm_id == id) {
        var s = itemY;

        return s;
      } else {
        return null;
      }
    });
  }
  function qtynm(id) {
    var q;
   
    mlist.filter((itemY) => {
      if (itemY.mm_id == id) {
        q = itemY.quantity;
        return itemY;
      } else {
        return null;
      }
    });
    return parseInt(q);
  }

  const DialogAddCard = ({
    
    prodcutname,
    pqty,
    pname,
    pid,
    dialogType,
    qtyproduct,
  }) => {
    // ** States
    
    
    const [prodcutnamed, setprodcutnamed] = useState(prodcutname);
    const [pqtyd, setpqtyd] = useState(pqty);
    const [pnamed, setpnamed] = useState(pname);

    const [pidd, setpidd] = useState(pid);
    const [focus, setFocus] = useState(null);

    const handleBlur = () => setFocus(undefined);
    

    const handleClose = () => {
      setShow(false);
      setpidd("");
      setpnamed("");
      setpqtyd("");
    };
    const handlesubmit = () => {
      //setShow(false);

      pushproduct(pidd, pqtyd);
      setpidd("");
      setpnamed("");
      setpqtyd("");
    };
    async function pushproduct(pidd, qtyproductd) {
      let objIndex = mlist.findIndex((obj) => obj.mm_id == pidd);

      if (objIndex == -1) {
        mlist.push({
          mm_id: pidd,
          quantity: qtyproductd,
        });
        var datanew = {
          moving_material_list: mlist,
          c_id: "c" + id,
        };
        const response = await axios.post(
          "https://umzungcrmtest.vercel.app/api/updateAdminLeadMoving",
          {
            datanew,
          }
        );
        //console.log(response);
        if (response.status == 200) {
          setShow(false);
          setrefreshdata(true);
        }
      } else {
        mlist.splice(objIndex, 1);

        mlist.push({
          mm_id: pidd,
          quantity: qtyproductd
        });

        var datanew = {
          moving_material_list: mlist,
          c_id: "c" + id,
        };
        const response = await axios.post(
          "https://umzungcrmtest.vercel.app/api/updateAdminLeadMoving",
          {
            datanew,
          }
        );
        //console.log(response);
        if (response.status == 200) {
          setrefreshdata(true);
          setShow(false);
          setpidd("");
          setpnamed("");
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
            setdialogType("add");

            setpidd("");
            setpnamed("");
            setpqty("");

            
            setShow(true);
          }}
        >
          Add Products
        </Button>
        <Card>
          <Dialog
            fullWidth
            open={show}
            maxWidth="sm"
            scroll="body"
            onClose={handleClose}
            //onBackdropClick={handleClose}
            TransitionComponent={Transition}
          >
            <DialogContent
              sx={{
                pb: 6,
                px: { xs: 8, sm: 15 },
                pt: { xs: 10, sm: 19.5 },
                position: "relative",
                zIndex: 1500,
              }}
            >
              <IconButton
                size="small"
                onClick={handleClose}
                sx={{ position: "absolute", right: "1rem", top: "1rem" }}
              >
                <Close />
              </IconButton>
              <Box sx={{ mb: 1, mt: 3, textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 1, lineHeight: "2rem" }}>
                  Add Product
                </Typography>
              </Box>
              <Grid container spacing={6}>
                <Grid
                  item
                  xs={12}
                  sx={{ pt: (theme) => `${theme.spacing(1)} !important` }}
                >
                  <Grid container spacing={6}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        borderRadius: 1,
                        p: 5,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      {dialogType == "add" ? (
                        <Grid>
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
                              setpidd(newValue.mm_id);

                              setassemblyValued(
                                newValue.service_price.assembly + " ???"
                              );
                              setpackingValued(
                                newValue.service_price.packing + " ???"
                              );
                              setunpackingValued(
                                newValue.service_price.unpacking + " ???"
                              );
                              setdissasemblyValued(
                                newValue.service_price.dissasembly + " ???"
                              );
                            }}
                            inputValue={pnamed}
                            onInputChange={(event, newInputValue) => {
                              setpnamed(newInputValue);
                            }}
                            filterOptions={filterOptions}
                            id="autocomplete-custom-filter"
                            getOptionLabel={(option) => option.tittle}
                            renderInput={(params) => (
                              <TextField {...params} label="Add Products" />
                            )}
                          />
                        </Grid>
                      ) : (
                        <TextField
                          fullWidth
                          sx={{ mt: 5 }}
                          value={prodcutnamed}
                          disabled
                          //onBlur={handleBlur}
                          label="Product Name"
                          placeholder="Name"
                          onFocus={(e) => setFocus(e.target.name)}
                        />
                      )}
                      {dialogType == "add" ? (
                        <Grid item xs={12} sx={{ mt: 4 }}>
                          <TextField
                            fullWidth
                            name="name"
                            type="number"
                            value={pqtyd}
                            autoComplete="off"
                            //onBlur={handleBlur}
                            label="Quantity"
                            placeholder="1"
                            onChange={(e) => setpqtyd(e.target.value)}
                            //onFocus={(e) => setFocus(e.target.name)}
                          />
                        </Grid>
                      ) : (
                        <Grid item xs={12} sx={{ mt: 4 }}>
                          <TextField
                            fullWidth
                            //name="name"
                            type="number"
                            value={pqtyd}
                            // autoComplete="off"
                            //onBlur={handleBlur}
                            label="Quantity"
                            placeholder="1"
                            onChange={(e) => setpqtyd(e.target.value)}
                            //onFocus={(e) => setFocus(e.target.name)}
                          />
                        </Grid>
                      )}
                    </Grid>
                    <Divider variant="middle" sx={{ color: "black" }} />
                   
                  
                    
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
        title="Products List"
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
            <DialogAddCard
              prodcutname={prodcutname}
              pqty={pqty}
              pname={pname}
              pid={pid}
              dialogType={dialogType}
              qtyproduct={qtyproduct}
            />
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
          getRowId={(row) => row.mm_id}
          columns={columns}
          rows={pdata}
          pageSize={pageSize}
          getCellClassName={(params) => {
            if (params.row.tittle == "Total") {
              return "cold";
            }
          }}
          componentsProps={{
            footer: { total,ctotal },
          }}
          components={{
            Footer: CustomFooterTotalComponent,
          }}
          disableSelectionOnClick
          onStateChange={(state) => {
      
            
            

            const ctotal = pdata
              .map(
                (item) =>
                  parseFloat(item.size.cubic_meter) *
                  parseFloat(qtynm(item.mm_id))
              )
              .reduce((a, b) => a + b, 0);

            setCtotal(ctotal);
            const total = pdata
              .map((item) => item.price * qtynm(item.mm_id))
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

export default MovingMaterial;
