// ** React Imports
import { useState, useEffect, forwardRef } from "react";

// ** Next Import
import Link from 'next/link'
import axios from "axios";
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'

import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Tooltip from '@mui/material/Tooltip'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Drawer from "@mui/material/Drawer";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
// ** Icons Imports
import Send from 'mdi-material-ui/Send'
import Check from 'mdi-material-ui/Check'
import ArrowUp from 'mdi-material-ui/ArrowUp'
import ChartPie from 'mdi-material-ui/ChartPie'
import Download from 'mdi-material-ui/Download'
import ArrowDown from 'mdi-material-ui/ArrowDown'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import ContentCopy from 'mdi-material-ui/ContentCopy'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import ContentSaveOutline from 'mdi-material-ui/ContentSaveOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import InputLabel from "@mui/material/InputLabel";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
// ** Custom Component Imports
import CustomAvatar from "src/@core/components/mui/cubicmeter";
import { updateProducts } from 'src/store/apps/products'
import { top100Films } from "src/@fake-db/autocomplete";
import CardContent from "@mui/material/CardContent";
import Fade from "@mui/material/Fade";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";

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
const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(3, 4),
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
}));
// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'secondary', icon: <Send sx={{ fontSize: '1.25rem' }} /> },
  Paid: { color: 'success', icon: <Check sx={{ fontSize: '1.25rem' }} /> },
  Draft: { color: 'primary', icon: <ContentSaveOutline sx={{ fontSize: '1.25rem' }} /> },
  'Partial Payment': { color: 'warning', icon: <ChartPie sx={{ fontSize: '1.25rem' }} /> },
  'Past Due': { color: 'error', icon: <InformationOutline sx={{ fontSize: '1.25rem' }} /> },
  Downloaded: { color: 'info', icon: <ArrowDown sx={{ fontSize: '1.25rem' }} /> }
}

const RowOptions = ({ id }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem>
          <Download fontSize='small' sx={{ mr: 2 }} />
          Download
        </MenuItem>
        <Link href={`/apps/invoice/edit/${id}`} passHref>
          <MenuItem>
            <PencilOutline fontSize='small' sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        </Link>
        
      </Menu>
    </>
  )
}



const InvoiceListTable = ({ invoiceData, productdata,id }) => {
  // ** State
  const [pageSize, setPageSize] = useState(7);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pdata, setpdata] = useState([]);
    const [data, setData] = useState([]);
    const [plist, setplist] = useState([]);
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
            <StyledLink>#{row.p_id}</StyledLink>
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
      flex: 0.15,
      minWidth: 80,
      field: "cubic_meter",
      headerName: "yes",
      renderHeader: () => (
        <Box>
          <Typography variant="caption">Cubic meter</Typography>
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
    },
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
           var qty_new = qty(row.p_id);
         
          
           if (qty_new.length!=0)
           {
             //console.log(row)
          var qty_new = qty(row.p_id);
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
          var qtysum = row.size.qty;
          totalcubicsum = parseFloat(row.size.cubic_meter) * parseFloat(qtysum);
        } else {
           
            var qty_new = qty(row.p_id);
          if (qty_new.length != 0) {
            qty_new = qty_new[0].quantity;

              totalcubicsum = parseFloat(row.size.cubic_meter) * parseFloat(qty_new);
            }
          
        
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              {totalcubicsum.toFixed(2)} m<sup style={{ width: 45, height: 40 }}>3</sup>
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>
              {totalcubicsum.toFixed(2)} m<sup style={{ width: 45, height: 40 }}>3</sup>
            </StyledLink>
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
      product_list: someArray,
      c_id: "c1",
    };

    const response = await axios.post(
      "https://umzungcrmtest.vercel.app/api/updateAdminLeadProduct",
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

    //console.log(plist);
    let someArray = plist.filter((p_list) => p_list.p_id != row.p_id);
    //product_list;
    //console.log(someArray);
    updateProducts(someArray);

    //dispatch(deleteUser(p_id));
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
      setplist(datas.product_list);
      //setloaddata(true);
      setrefreshdata(false);
    })
    .catch(() => {
      setData(null);
      //setloaddata(false);
    });
  //console.log(plist);
}, [refreshdata]);

  useEffect(() => {
    if (productdata.length != 0) {
      if (plist.length!=0) {
        let yFilter = plist.map((itemY) => {
          return itemY.p_id;
        });

        let filteredX = productdata.filter((itemX) =>
          yFilter.includes(itemX.p_id)
        );
        
        setpdata(filteredX);

        // traveler.map(amount).reduce(sum);
        // => 235;

        // or use arrow functions
        var sums = filteredX
          .map((item) => parseFloat(item.size.cubic_meter))
          .reduce((prev, next) => prev + next);
        

        var sumQty = plist
          .map((item) => parseInt(item.quantity))
          .reduce((prev, next) => prev + next);

       

        var a = {
          tittle: "Total",
          size: {
            length: "0",
            breath: "0",
            height: "0",
            cubic_meter: parseFloat(sums).toFixed(2),
            qty: sumQty,
          },

          p_id: "",
        };
        setpdata([...filteredX, a]);
        //console.log(pdata);

      }
    }
  }, [plist,refreshdata]);
  function qty(id) {
    return plist.filter((itemY) => {
      if (itemY.p_id == id) {
        return itemY;
      } else {
        return null;
      }
    });
  }
const DialogAddCard = () => {
  // ** States
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [cvc, setCvc] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [focus, setFocus] = useState();
  const [expiry, setExpiry] = useState("");
  const handleBlur = () => setFocus(undefined);



  const [pid, setpid] = useState("");
  const [pname, setpname] = useState("");
  const [qty, setqty] = useState("");
  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value, Payment);
      setCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      setExpiry(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value, cardNumber, Payment);
      setCvc(target.value);
    }
  };

  const handleClose = () => {
    setShow(false);
    setpid("");
    setpname("")
  };
  const handlesubmit = () => {
    //setShow(false);
    
    
   
    pushproduct(pid,qty);
    setpid("");
    setpname("");
    
  };
  async function pushproduct( pid,qty) {
   let  objIndex = plist.findIndex((obj) => obj.p_id == pid);
      //console.log(objIndex);


      if (objIndex==-1)
      {
        plist.push({"p_id":pid,"quantity":qty})
        var datanew = {
          product_list: plist,
          c_id: "c1",
        };
        const response = await axios.post(
          "https://umzungcrmtest.vercel.app/api/updateAdminLeadProduct",
          {
            datanew,
          }
        );
        //console.log(response);
        if (response.status == 200) {
          setrefreshdata(true);
        }
      }
      else
      {

        plist.splice(objIndex, 1);
        plist.push({"p_id":pid,"quantity":qty})
        var datanew = {
          product_list: plist,
          c_id: "c1",
        };
const response = await axios.post(
  "https://umzungcrmtest.vercel.app/api/updateAdminLeadProduct",
  {
    datanew,
  }
);
//console.log(response);
if (response.status == 200) {
  setrefreshdata(true);
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
        onClick={() => setShow(true)}
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
              <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                Add Product
              </Typography>
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
                    <Autocomplete
                      sx={{
                        lineHeight: "32px !important",
                        letterSpacing: "0.15px !important",
                        pl: 20,
                        pr: 20,
                        pt: 10,
                      }}
                      options={productdata}
                      onChange={(event, newValue) => {
                        setpid(newValue.p_id);
                      }}
                      inputValue={pname}
                      onInputChange={(event, newInputValue) => {
                        setpname(newInputValue);
                      }}
                      filterOptions={filterOptions}
                      id="autocomplete-custom-filter"
                      getOptionLabel={(option) => option.tittle}
                      renderInput={(params) => (
                        <TextField {...params} label="Add Products" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      name="name"
                      type="number"
                      value={qty}
                      autoComplete="off"
                      onBlur={handleBlur}
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
            <Button variant="outlined" color="secondary" onClick={handleClose}>
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
            <DialogAddCard />

            <Button
              variant="contained"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ChevronDown />}
              aria-expanded={open ? "true" : undefined}
              aria-controls={open ? "user-view-overview-export" : undefined}
            >
              Exports
            </Button>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              id="user-view-overview-export"
            >
              <MenuItem onClick={handleClose}>PDF</MenuItem>
              <MenuItem onClick={handleClose}>XLSX</MenuItem>
              <MenuItem onClick={handleClose}>CSV</MenuItem>
            </Menu>
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
          getRowId={(row) => row.p_id}
          columns={columns}
          rows={pdata}
          pageSize={pageSize}
          getCellClassName={(params) => {
            if (params.row.tittle == "Total") {
              return "cold";
            }
          }}
          disableSelectionOnClick
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
        />
      </Box>
    </Card>
  );
};

export default InvoiceListTable
