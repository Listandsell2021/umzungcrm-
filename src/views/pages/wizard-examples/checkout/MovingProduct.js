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
import { CustomFooterTotalComponent } from "./customFooterProducts.js";
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

const MovingProduct = ({ invoiceData, productdata, id }) => {
  // ** State
  const [pageSize, setPageSize] = useState(7);
  const [qtyproduct, setqtyproduct] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [pdata, setpdata] = useState([]);
  const [data, setData] = useState([]);
  const [plist, setplist] = useState([]);
  const [show, setShow] = useState(false);
  const [prodcutname, setprodcutname] = useState("");
  const [pqty, setpqty] = useState("");
  const [CheckBoxassembly, setCheckBoxassembly] = useState(false);
  const [CheckBoxpacking, setCheckBoxpacking] = useState(false);
  const [CheckBoxunpacking, setCheckBoxunpacking] = useState(false);
  const [CheckBoxdissasembly, setCheckBoxdissasembly] = useState(false);
  const [packingValue, setpackingValue] = useState("");
  const [assemblyValue, setassemblyValue] = useState("");
  const [unpackingValue, setunpackingValue] = useState("");
  const [dissasemblyValue, setdissasemblyValue] = useState("");

  const [sumServiceassembly, setsumServiceassembly] = useState(0);
  const [sumServicepacking, setsumServicepacking] = useState(0);
  const [sumServiceunpacking, setsumServiceunpacking] = useState(0);
  const [sumServicdissasembly, setsumServicedissasembly] = useState(0);
  const [ctotal, setCtotal] = useState(0);
  const [total, setTotal] = useState(0);
  


  const [sum, setsum] = useState(0);
  const [pname, setpname] = useState("");

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
              #{row.p_id}
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
          var qty_new = qty(row.p_id);

          if (qty_new.length != 0) {
            //console.log(row)
            var qty_new = qty(row.p_id);
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
                {/* <Link href={`/apps/products/view/${p_idnew}`} passHref> */}
                <Typography
                  noWrap
                  component="a"
                  variant="subtitle2"
                  sx={{ color: "text.primary", textDecoration: "none" }}
                >
                  {row.tittle}
                </Typography>
                {/* </Link> */}
                {/* <Link href={`/apps/products/view/${p_idnew}`} passHref> */}
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
      field: "dissasembly",
      minWidth: 90,
      headerName: "Dissasembly",
      renderCell: ({ row }) => {
        var value;
        if (row.tittle == "Total") {
          if (row.sumdissasembly == 0) {
            value = "";
            
          } else {
            value = row.sumdissasembly + " €";
            //setsumService(parseFloat(sumService) + parseFloat(row.sumdissasembly));
            
          }
        } else {
          var check = service(row.p_id);
          if (check) {
            if (check[0].product_services_list.dissasembly) {
              value = row.service_price.dissasembly + " " + "€";
             
            } else {
              setsum(parseFloat(0));
              value = "--------";
              
            }
          }
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

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
              {value}
            </Typography>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "assembly",
      minWidth: 90,
      headerName: "Assembly",
      renderCell: ({ row }) => {
        var value;
        if (row.tittle == "Total") {
          if (row.sumassembly == 0) {
            value = "";
          } else {
            value = row.sumassembly + " €";
           
          }
        } else {
          var check = service(row.p_id);

          if (check[0].product_services_list.assembly) {
            value = row.service_price.assembly + " " + "€";
            
          } else {
            value = "--------";
           
          }
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

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
              {value}
            </Typography>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "packing",
      minWidth: 90,
      headerName: "Packing",
      renderCell: ({ row }) => {
        var value;
        if (row.tittle == "Total") {
          if (row.sumpacking == 0) {
            value = "";
          } else {
            value = row.sumpacking + " €";
           
          }
        } else {
          var check = service(row.p_id);

          if (check[0].product_services_list.packing) {
            value = row.service_price.packing + " " + "€";
            
          } else {
            
            value = "--------";
          }
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

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
              {value}
            </Typography>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "unpacking",
      minWidth: 90,
      headerName: "Unpacking",
      renderCell: ({ row }) => {
        var value;
        if (row.tittle == "Total") {
          if (row.sumunpacking == 0) {
            value = "";
          } else {
            value = row.sumunpacking + " €";
            
          }
        } else {
          var check = service(row.p_id);

          if (check[0].product_services_list.unpacking) {
            value = row.service_price.unpacking + " " + "€";
          
            
          } else {
            value = "--------";
            
          }
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

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
              {value}
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
                    var qty_new = qty(row.p_id);
                    qty_new = qty_new[0].quantity;

                    setpqty(qty_new);
                   
                    setpid(row.p_id);
                    setpname(row.tittle);
                    setdialogType("edit");
                    var check = service(row.p_id);

                    setCheckBoxassembly(
                      check[0].product_services_list.assembly
                    );
                    setassemblyValue(row.service_price.assembly + " " + "€");

                    setCheckBoxpacking(check[0].product_services_list.packing);
                    setpackingValue(row.service_price.packing + " " + "€");

                    setCheckBoxdissasembly(
                      check[0].product_services_list.dissasembly
                    );
                    setdissasemblyValue(
                      row.service_price.dissasembly + " " + "€"
                    );

                    setCheckBoxunpacking(
                      check[0].product_services_list.unpacking
                    );
                    setunpackingValue(row.service_price.unpacking + " " + "€");

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
      product_list: someArray,
      c_id: "c" + id,
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
      if (plist.length != 0) {
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

        /*var sumDissasembly = filteredX
          .map((item) => parseInt(item.service_price.dissasembly))
          .reduce((prev, next) => prev + next);*/

        var sumDissasembly = filteredX.reduce(function (sum, current) {
          if (getserviceCheck(current.p_id, "dissasembly")) {
            return sum + current.service_price.dissasembly;
          } else {
            return sum;
          }
        }, 0);

        var sumAssembly = filteredX.reduce(function (sum, current) {
          if (getserviceCheck(current.p_id, "assembly")) {
            return sum + current.service_price.assembly;
          } else {
            return sum;
          }
        }, 0);

        // var sumPacking = filteredX
        //   .map((item) => parseInt(item.service_price.packing))
        //   .reduce((prev, next) => prev + next);

        var sumPacking = filteredX.reduce(function (sum, current) {
          if (getserviceCheck(current.p_id, "packing")) {
            return sum + current.service_price.packing;
          } else {
            return sum;
          }
        }, 0);

        var sumUnpacking = filteredX.reduce(function (sum, current) {
          if (getserviceCheck(current.p_id, "unpacking")) {
            return sum + current.service_price.unpacking;
          } else {
            return sum;
          }
        }, 0);

        //console.log(sumDissasembly);

        var a = {
          tittle: "Total",
          size: {
            length: "0",
            breath: "0",
            height: "0",
            cubic_meter: "1",
            qty: ctotal,
          },
          sumdissasembly: sumDissasembly,
          sumassembly: sumAssembly,
          sumpacking: sumPacking,
          sumunpacking: sumUnpacking,

          p_id: "",
        };
        setsumServicedissasembly(parseFloat(sumDissasembly));
        setsumServiceassembly(parseFloat(sumAssembly));
        setsumServicepacking(parseFloat(sumPacking));
        setsumServiceunpacking(parseFloat(sumUnpacking));

        setpdata([...filteredX]);
        //console.log(pdata);
      }
    }
  }, [plist, refreshdata]);
  function qty(id) {
    return plist.filter((itemY) => {
      if (itemY.p_id == id) {
        return itemY;
      } else {
        return null;
      }
    });
  }

  function getserviceCheck(id, service) {
    var check = plist.filter((itemY, service) => {
      if (itemY.p_id == id) {
        var s = itemY;

        return s;
      } else {
        return null;
      }
    });
    check = check[0].product_services_list;

    if (service == "assembly") {
      return check.assembly;
    } else if (service == "dissasembly") {
      return check.dissasembly;
    } else if (service == "packing") {
      return check.packing;
    } else if (service == "unpacking") {
      return check.unpacking;
    } else {
    }
  }
  function service(id) {
    return plist.filter((itemY, service) => {
      if (itemY.p_id == id) {
        var s = itemY;

        return s;
      } else {
        return null;
      }
    });
  }
  function qtynm(id) {
    var q;

    plist.filter((itemY) => {
 
      if (itemY.p_id == id) {

        q = itemY.quantity;
             
        return itemY;
      }
       else if(id=="") {
         q =1;
        return 0;
      }
    });
    return parseInt(q);
  }

  const DialogAddCard = ({
    CheckBoxassembly,
    CheckBoxpacking,
    CheckBoxunpacking,
    CheckBoxdissasembly,
    packingValue,
    assemblyValue,
    unpackingValue,
    dissasemblyValue,
    prodcutname,
    pqty,
    pname,
    pid,
    dialogType,
    qtyproduct,
  }) => {
    // ** States
    const [qtyproductd, setqtyproductd] = useState(qtyproductd);
    const [CheckBoxassemblyd, setCheckBoxassemblyd] =
      useState(CheckBoxassembly);
    const [CheckBoxpackingd, setCheckBoxpackingd] = useState(CheckBoxpacking);
    const [CheckBoxunpackingd, setCheckBoxunpackingd] =
      useState(CheckBoxunpacking);
    const [CheckBoxdissasemblyd, setCheckBoxdissasemblyd] =
      useState(CheckBoxdissasembly);

    const [packingValued, setpackingValued] = useState(packingValue);
    const [assemblyValued, setassemblyValued] = useState(assemblyValue);
    const [unpackingValued, setunpackingValued] = useState(unpackingValue);
    const [dissasemblyValued, setdissasemblyValued] =
      useState(dissasemblyValue);
    const [prodcutnamed, setprodcutnamed] = useState(prodcutname);
    const [pqtyd, setpqtyd] = useState(pqty);
    const [pnamed, setpnamed] = useState(pname);

    const [pidd, setpidd] = useState(pid);
    const [focus, setFocus] = useState(null);

    const handleBlur = () => setFocus(undefined);
    useEffect(() => {
      if (dialogType == "add") {
        setCheckBoxassemblyd(false);
        setassemblyValued("");

        setCheckBoxpackingd(false);
        setpackingValued("");

        setCheckBoxdissasemblyd(false);
        setdissasemblyValued("");

        setCheckBoxunpackingd(false);
        setunpackingValued("");
      }
    }, [dialogType]);

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
      let objIndex = plist.findIndex((obj) => obj.p_id == pidd);

      if (objIndex == -1) {
        plist.push({
          p_id: pidd,
          quantity: qtyproductd,
          product_services_list: {
            assembly: CheckBoxassemblyd,
            packing: CheckBoxpackingd,
            unpacking: CheckBoxunpackingd,
            dissasembly: CheckBoxdissasemblyd,
          },
        });
        var datanew = {
          product_list: plist,
          c_id: "c" + id,
        };
        const response = await axios.post(
          "https://umzungcrmtest.vercel.app/api/updateAdminLeadProduct",
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
        plist.splice(objIndex, 1);
       
       
        plist.push({
          p_id: pidd,
          quantity: qtyproductd,
          product_services_list: {
            assembly: CheckBoxassemblyd,
            packing: CheckBoxpackingd,
            unpacking: CheckBoxunpackingd,
            dissasembly: CheckBoxdissasemblyd,
          },
        });
       
       
        var datanew = {
          product_list: plist,
          c_id: "c" + id,
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
          setShow(false);
          setpidd("");
          setpnamed("");
        }
      }
    }
    const handleCheckBoxassembly = (event) => {
      setCheckBoxassemblyd(event.target.checked);
    };
    const handleCheckBoxpacking = (event) => {
      setCheckBoxpackingd(event.target.checked);
    };
    const handleCheckBoxunpacking = (event) => {
      setCheckBoxunpackingd(event.target.checked);
    };
    const handleCheckBoxdissasembly = (event) => {
      setCheckBoxdissasemblyd(event.target.checked);
    };
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

            setCheckBoxassemblyd(false);
            setdissasemblyValued("");

            setCheckBoxpackingd(false);
            setpackingValued("");

            setCheckBoxdissasemblyd(false);
            setdissasemblyValued("");

            setCheckBoxunpackingd(false);
            setunpackingValued("");
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
                            options={productdata}
                            onChange={(event, newValue) => {
                              setpidd(newValue.p_id);

                              setassemblyValued(
                                newValue.service_price.assembly + " €"
                              );
                              setpackingValued(
                                newValue.service_price.packing + " €"
                              );
                              setunpackingValued(
                                newValue.service_price.unpacking + " €"
                              );
                              setdissasemblyValued(
                                newValue.service_price.dissasembly + " €"
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
                    <Grid item xs={12} sx={{ mt: 4 }}>
                      <Typography variant="h6" sx={{ mt: 3 }}>
                        Product Services
                      </Typography>
                    </Grid>
                    <Box sx={{ ml: 10 }}></Box>
                    <Box
                      sx={{
                        display: "grid",
                        gridAutoColumns: "1fr",
                        gap: 2,
                        p: 5,

                        borderRadius: 1,
                        gridTemplateRows: "auto",
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box
                        sx={{
                          gridRow: "1",
                          gridColumn: "span 1",

                          p: 4,
                        }}
                      >
                        <Checkbox
                          checked={CheckBoxassemblyd}
                          onChange={handleCheckBoxassembly}
                        />
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: 12 }}
                          gutterBottom
                        >
                          Assembly
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: "bold",
                            ml: 1,
                            fontSize: 18,
                            color: "primary.main",
                          }}
                          gutterBottom
                        >
                          {assemblyValued}
                        </Typography>
                      </Box>
                      <Box sx={{ gridRow: "1", gridColumn: "2", p: 4 }}>
                        <Checkbox
                          checked={CheckBoxunpackingd}
                          onChange={handleCheckBoxunpacking}
                        />
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: 12 }}
                          gutterBottom
                        >
                          unpacking
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: "bold",
                            ml: 1,
                            fontSize: 18,
                            color: "primary.main",
                          }}
                          gutterBottom
                        >
                          {unpackingValued}
                        </Typography>
                      </Box>
                      <Box sx={{ gridRow: "1", gridColumn: "3", p: 4 }}>
                        <Checkbox
                          checked={CheckBoxpackingd}
                          onChange={handleCheckBoxpacking}
                        />
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: 12 }}
                          gutterBottom
                        >
                          Packing
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: "bold",
                            ml: 1,
                            fontSize: 18,
                            color: "primary.main",
                          }}
                          gutterBottom
                        >
                          {packingValued}
                        </Typography>
                      </Box>
                      <Box sx={{ gridRow: "1", gridColumn: "4", p: 4 }}>
                        <Checkbox
                          checked={CheckBoxdissasemblyd}
                          onChange={handleCheckBoxdissasembly}
                        />
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: 12 }}
                          gutterBottom
                        >
                          Dissasembly
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: "bold",
                            ml: 1,
                            fontSize: 18,
                            color: "primary.main",
                          }}
                          gutterBottom
                        >
                          {dissasemblyValued}
                        </Typography>
                      </Box>
                    </Box>
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
              CheckBoxassembly={CheckBoxassembly}
              CheckBoxpacking={CheckBoxpacking}
              CheckBoxunpacking={CheckBoxunpacking}
              CheckBoxdissasembly={CheckBoxdissasembly}
              packingValue={packingValue}
              assemblyValue={assemblyValue}
              unpackingValue={unpackingValue}
              dissasemblyValue={dissasemblyValue}
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
          getRowId={(row) => row.p_id}
          columns={columns}
          rows={pdata}
          pageSize={pageSize}
          getCellClassName={(params) => {
            if (params.row.tittle == "Total") {
              return "cold";
            }
          }}
          componentsProps={{
            footer: { total, ctotal },
          }}
          components={{
            Footer: CustomFooterTotalComponent,
          }}
          onStateChange={(state) => {
            /*pdata.map((item)=>{
               console.log(
                  item.p_id,
                  (parseFloat(item.size.cubic_meter) * parseFloat(qtynm(item.p_id)))
                );
                console.log(
                  item.p_id,
                  parseInt(qtynm(item.p_id))
                );
              })*/

            var sumtotal =
              parseFloat(sumServicdissasembly) +
              parseFloat(sumServiceassembly) +
              parseFloat(sumServicepacking) +
              parseFloat(sumServiceunpacking);

            setTotal(sumtotal.toFixed(2));
            const ctotal = pdata
              .map(
                (item) =>
                  parseFloat(item.size.cubic_meter) *
                  parseFloat(qtynm(item.p_id))
              )
              .reduce((a, b) => a + b, 0);

            setCtotal(ctotal);
          }}
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
        />
      </Box>
    </Card>
  );
};

export default MovingProduct;
