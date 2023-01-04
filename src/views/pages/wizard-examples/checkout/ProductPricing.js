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
import Icon from "src/@core/components/icon";
import Fab from "@mui/material/Fab";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
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
import Pdf from "react-to-pdf";
// ** Third Party Imports
import Payment from "payment";
import Cards from "react-credit-cards";
const ref = React.createRef();
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



const InvoiceListTable = ({
  invoiceData,
  productdata,
  id,
  movingdata,
  movingservicesdata,
}) => {
  // ** State
  const [pageSize, setPageSize] = useState(7);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pdata, setpdata] = useState([]);
  const [cubicprice, setcubicprice] = useState("");
  const [perfloorprice, setperfloorprice] = useState("");
  const [perdistanceprice, setperdistanceprice] = useState("");
  const [mdata, setmdata] = useState([]);
  const [mservicesdata, setmservicesdata] = useState([]);
  const [dataall, setdataall] = useState([]);
  const [floordata, setfloordata] = useState([]);
  const [distancedata, setdistancedata] = useState([]);
  const [data, setData] = useState([]);
  const [plist, setplist] = useState([]);

  const [mlist, setmlist] = useState([]);
  const [mslist, setmslist] = useState([]);
  const [refreshdata, setrefreshdata] = useState(true);

  const [ProductsTotalPrice, setProductsTotalPrice] = useState("");
  const [MovingTotalPrice, setMovingTotalPrice] = useState("");
  const [MovingMaterialTotalPrice, setMovingMaterialTotalPrice] = useState("");
  const [FloorsTotalPrice, setFloorsTotalPrice] = useState("");
  const [DistanceTotalPrice, setDistanceTotalPrice] = useState("");
  const [discountvalue, setdiscountvalue] = useState(0);
  const [finalprice, setfinalprice] = useState(0);

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

  //Column Floor
  const columnsDistance = [
    /* {
      flex: 0.1,
      field: "fromFloor",
      minWidth: 90,
      headerName: "Move Out Floors",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{row.fromfloor}</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>{row.fromfloor}</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.1,
      field: "toFloor",
      minWidth: 90,
      headerName: "Move In Floors",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{row.tofloor}</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>{row.tofloor}</StyledLink>
            // </Link>
          );
        }
      },
    },*/
    {
      flex: 0.1,
      field: "TotalDistance",
      minWidth: 90,
      headerName: "Total Distance",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              {parseFloat(row.totalDistance)}
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink> {parseFloat(row.totalDistance)}</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.1,
      field: "perfloorprice",
      minWidth: 90,
      headerName: "Per Distance Price ",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{perdistanceprice}€</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink> {perdistanceprice}€</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.1,
      field: "setcubicprice",
      minWidth: 90,
      headerName: "Total Price",
      renderCell: ({ row }) => {
        setDistanceTotalPrice(
          parseFloat(row.totalDistance) * parseFloat(perdistanceprice)
        );
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              {(
                parseFloat(row.totalDistance) * parseFloat(perdistanceprice)
              ).toFixed(2)}
              €
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>
              {(
                (parseFloat(row.fromfloor) + parseFloat(row.tofloor)) *
                parseFloat(perfloorprice)
              ).toFixed(2)}
              €
            </StyledLink>
            // </Link>
          );
        }
      },
    },
  ];
  //Column Floor
  const columnsFloor = [
    /* {
      flex: 0.1,
      field: "fromFloor",
      minWidth: 90,
      headerName: "Move Out Floors",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{row.fromfloor}</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>{row.fromfloor}</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.1,
      field: "toFloor",
      minWidth: 90,
      headerName: "Move In Floors",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{row.tofloor}</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>{row.tofloor}</StyledLink>
            // </Link>
          );
        }
      },
    },*/
    {
      flex: 0.1,
      field: "TotalFloor",
      minWidth: 90,
      headerName: "Total Floors",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              {(parseFloat(row.fromfloor) + parseFloat(row.tofloor)).toFixed(2)}
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>
              {" "}
              {(parseFloat(row.fromfloor) + parseFloat(row.tofloor)).toFixed(2)}
            </StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.1,
      field: "perfloorprice",
      minWidth: 90,
      headerName: "Per Floor Price ",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{perfloorprice}€</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink> {perfloorprice}€</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.1,
      field: "setcubicprice",
      minWidth: 90,
      headerName: "Total Price",
      renderCell: ({ row }) => {
        setFloorsTotalPrice(
          (parseFloat(row.fromfloor) + parseFloat(row.tofloor)) *
            parseFloat(perfloorprice)
        );
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              {(
                (parseFloat(row.fromfloor) + parseFloat(row.tofloor)) *
                parseFloat(perfloorprice)
              ).toFixed(2)}
              €
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>
              {(
                (parseFloat(row.fromfloor) + parseFloat(row.tofloor)) *
                parseFloat(perfloorprice)
              ).toFixed(2)}
              €
            </StyledLink>
            // </Link>
          );
        }
      },
    },
  ];
  //moving services
  const columnsServicesMoving = [
    {
      flex: 0.2,
      field: "totalservicesempty",
      minWidth: 90,
      headerName: "",
      renderCell: ({ row }) => {
        

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink></StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "totalservice",
      minWidth: 90,
      headerName: "Total Services",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{row.qty}</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>{row.qty}</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "setcubicprice",
      minWidth: 90,
      headerName: "Total Price",
      renderCell: ({ row }) => {
        var qty_new;
        var totalcubicsum;
        if (row.tittle == "Total") {
          qty_new = 0;
          var qtysum = row.size.qty;
          totalcubicsum = parseFloat(row.size.cubic_meter) * parseFloat(qtysum);
          setMovingTotalPrice(
            parseFloat(totalcubicsum)
          );
        } else {
          var qty_new = qtymoving(row.ms_id);
          if (qty_new.length != 0) {
            qty_new = qty_new[0].quantity;

            totalcubicsum =
              parseFloat(row.size.cubic_meter) * parseFloat(qty_new);
          }
          setMovingTotalPrice(
             parseFloat(totalcubicsum)
          );
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              { parseFloat(totalcubicsum).toFixed(2)}€
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>{parseFloat(totalcubicsum).toFixed(2)}€</StyledLink>
            // </Link>
          );
        }
      },
    },
  ];
  //Column Moving
  const columnsMaterialsMoving = [
    {
      flex: 0.2,
      field: "movingempty",
      minWidth: 90,
      headerName: "",
      renderCell: ({ row }) => {
        /*var qty_new;
        var totalcubicsum;
        if (row.tittle == "Total") {
          qty_new = 0;
          var qtysum = row.size.qty;
          totalcubicsum = parseFloat(row.size.cubic_meter) * parseFloat(qtysum);
        } else {
          var qty_new = qtymoving(row.mm_id);
          if (qty_new.length != 0) {
            qty_new = qty_new[0].quantity;

            totalcubicsum =
              parseFloat(row.size.cubic_meter) * parseFloat(qty_new);
          }
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              {totalcubicsum} m<sup style={{ width: 45, height: 40 }}>3</sup>
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>
              {totalcubicsum} m<sup style={{ width: 45, height: 40 }}>3</sup>
            </StyledLink>
            // </Link>
          );
        }*/
      },
    },
    {
      flex: 0.2,
      field: "totalmovingmaterails",
      minWidth: 90,
      headerName: "Total Moving Materials ",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{row.qty}</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>{row.qty}</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "setcubicprice",
      minWidth: 90,
      headerName: "Total Price",
      renderCell: ({ row }) => {
        var qty_new;
        var totalcubicsum;
        if (row.tittle == "Total") {
          qty_new = 0;
          var qtysum = row.size.qty;
          totalcubicsum = parseFloat(row.size.cubic_meter) * parseFloat(qtysum);
          setMovingMaterialTotalPrice(
            (parseFloat(row.total) * parseFloat(row.qty)).toFixed(2)
          );
        } else {
          var qty_new = qtymoving(row.mm_id);
          if (qty_new.length != 0) {
            qty_new = qty_new[0].quantity;

            totalcubicsum =
              parseFloat(row.size.cubic_meter) * parseFloat(qty_new);
          }
          setMovingMaterialTotalPrice(
            (parseFloat(row.total) * parseFloat(row.qty)).toFixed(2)
          );
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              {(parseFloat(row.total) * parseFloat(row.qty)).toFixed(2)}€
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>
              {(parseFloat(row.total) * parseFloat(row.qty)).toFixed(2)}€
            </StyledLink>
            // </Link>
          );
        }
      },
    },
  ];
  const columns = [
    {
      flex: 0.2,
      field: "totalcubicmeter",
      minWidth: 90,
      headerName: "Total Cubic Meter",
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

            <Typography color="common.black">
              {totalcubicsum} m<sup style={{ width: 45, height: 40 }}>3</sup>
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>
              {totalcubicsum} m<sup style={{ width: 45, height: 40 }}>3</sup>
            </StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "percubicmeterprice",
      minWidth: 90,
      headerName: "Per Cubic Meter Price",
      renderCell: ({ row }) => {
        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">{cubicprice}€</Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>{cubicprice}€</StyledLink>
            // </Link>
          );
        }
      },
    },
    {
      flex: 0.2,
      field: "totalprice",
      minWidth: 90,
      headerName: "Total Price",
      renderCell: ({ row }) => {
        var qty_new;
        var totalcubicsum;
        if (row.tittle == "Total") {
          qty_new = 0;
          var qtysum = row.size.qty;
          totalcubicsum = parseFloat(row.size.cubic_meter) * parseFloat(qtysum);
          setProductsTotalPrice(
            parseFloat(cubicprice) * parseFloat(totalcubicsum)
          );
        } else {
          var qty_new = qty(row.p_id);
          if (qty_new.length != 0) {
            qty_new = qty_new[0].quantity;

            totalcubicsum =
              parseFloat(row.size.cubic_meter) * parseFloat(qty_new);
          }
          setProductsTotalPrice(
            parseFloat(cubicprice) * parseFloat(totalcubicsum)
          );
        }

        if (row.tittle == "Total") {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <Typography color="common.black">
              {(parseFloat(cubicprice) * parseFloat(totalcubicsum)).toFixed(2)}€
            </Typography>
            // </Link>
          );
        } else {
          return (
            // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

            <StyledLink>
              {(parseFloat(cubicprice) * parseFloat(totalcubicsum)).toFixed(2)}€
            </StyledLink>
            // </Link>
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
    let someArray = plist.filter((p_list) => p_list.p_id != row.p_id);

    updateProducts(someArray);
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

        setplist(datas.product_list);

        setmlist(datas.moving_material_list);
        setmslist(datas.moving_services_list);
        setdataall(datas);
        setrefreshdata(false);
      })
      .catch(() => {
        setData(null);
        //setloaddata(false);
      });
    //console.log(plist);
    var storedData = window.localStorage.getItem("userData");
    storedData = JSON.parse(storedData);
    var ids = { id: storedData.id };

    axios
      .post("https://umzungcrmtest.vercel.app/api/getAdminSettings", { ids })
      .then((response) => {
        setcubicprice(response.data[0].cost_per_meter_square);
        setperfloorprice(response.data[0].cost_per_floor);
        setperdistanceprice(response.data[0].cost_per_km);
      })
      .catch(() => {});
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
          .map((item) => item.size.cubic_meter)
          .reduce((prev, next) => prev + next);

        var sumQty = plist
          .map((item) => parseFloat(item.quantity))
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

          p_id: "",
        };
        setpdata([a]);

        var floordata = {
          tittle: "Total",
          size: {
            length: "0",
            breath: "0",
            height: "0",
            cubic_meter: sums,
            qty: sumQty,
          },
          fromfloor: dataall.from_details.floor,
          tofloor: dataall.to_details.floor,

          p_id: "t1",
        };
        setfloordata([floordata]);

        const fromaddress =
          dataall.from_address.street_name +
          " " +
          dataall.from_address.postcode +
          " " +
          dataall.from_address.city;
        const toaddress =
          dataall.to_address.street_name +
          " " +
          dataall.to_address.postcode +
          " " +
          dataall.to_address.city;
        const encodedfromaddress = encodeURI(fromaddress);
        const encodedtoaddress = encodeURI(toaddress);

        /*var axios = require("axios");

         var config = {
           method: "get",
           url: "https://maps.googleapis.com/maps/api/distancematrix/json?destinations=" +
             fromaddress +
             "&origins=" +
             toaddress +
             "&units=imperial&key=AIzaSyBM0EQIybavNsuW6lZP4E_2W5eIF46X1Wg",
           headers: {},
         };

         axios(config)
           .then(function (response) {
            var distancemile=response.data.rows[0].elements[0].distance.text;
            distancemile = distancemile.replace("mi", "");
             //console.log(JSON.stringify(response.data));
             distancemile = parseFloat(distancemile * 1.6);
             console.log(distancemile.toFixed(2));
           })
           .catch(function (error) {
             console.log(error);
           });*/

        var distancedata = {
          tittle: "Total",
          size: {
            length: "0",
            breath: "0",
            height: "0",
            cubic_meter: sums,
            qty: sumQty,
          },
          fromfloor: dataall.from_details.floor,
          tofloor: dataall.to_details.floor,
          totalDistance: 1.44,

          p_id: "t1",
        };
        setdistancedata([distancedata]);

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
  useEffect(() => {
    if (movingdata.length != 0) {
      if (mlist.length != 0) {
        let yFilter = mlist.map((itemY) => {
          return itemY.mm_id;
        });

        let filteredX = movingdata.filter((itemX) =>
          yFilter.includes(itemX.mm_id)
        );
        
        setmdata(filteredX);

        // traveler.map(amount).reduce(sum);
        // => 235;

        // or use arrow functions
        var sums = filteredX
          .map((item) => parseInt(item.price))
          .reduce((prev, next) => prev + next);

        var sumQty = mlist
          .map((item) => parseFloat(item.quantity))
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
          total: sums,
          qty: sumQty,

          mm_id: "",
        };

        setmdata([a]);


        if (mslist.length != 0) {
          let yFilter = mslist.map((itemY) => {
            return itemY.ms_id;
          });

          let filteredX = movingservicesdata.filter((itemX) =>
            yFilter.includes(itemX.ms_id)
          );

          
          setmservicesdata(filteredX);

          // traveler.map(amount).reduce(sum);
          // => 235;

          // or use arrow functions
          var sums = filteredX
            .map((item) => item.price)
            .reduce((prev, next) => prev + next);

          var sumQty = mslist
            .map((item) => parseFloat(item.quantity))
            .reduce((prev, next) => prev + next);

          var aa = {
            tittle: "Total",
            size: {
              length: "0",
              breath: "0",
              height: "0",
              cubic_meter: sums,
              qty: sumQty,
            },
            qty: sumQty,
            total:sums,

            ms_id: "",
          };

          setmservicesdata([aa]);

          console.log(mservicesdata);
        }
      }
    }
  }, [mlist,mslist, refreshdata]);
  function qtymoving(id) {
    return mlist.filter((itemY) => {
      if (itemY.mm_id == id) {
        return itemY;
      } else {
        return null;
      }
    });
  }
  const test = () => {
    return (
      <div ref={ref}>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  };
  function percentage(percent, total) {
    return ((percent / 100) * total).toFixed(2);
  }
  useEffect(() => {
    if (parseInt(discountvalue) > 100) {
      const total =
        parseFloat(ProductsTotalPrice) +
        parseFloat(MovingTotalPrice) +
        parseFloat(FloorsTotalPrice) +
        parseFloat(DistanceTotalPrice) +
        parseFloat(MovingMaterialTotalPrice);
      setfinalprice(total.toFixed(2));
    }
    if (discountvalue > 0) {
      const total =
        parseFloat(ProductsTotalPrice) +
        parseFloat(MovingTotalPrice) +
        parseFloat(FloorsTotalPrice) +
        parseFloat(DistanceTotalPrice) +
        parseFloat(MovingMaterialTotalPrice);
      const percentResult = percentage(total, discountvalue);
      setfinalprice((total - percentResult).toFixed(2));
    } 
     
    else {
      const total =
        parseFloat(ProductsTotalPrice) +
        parseFloat(MovingTotalPrice) +
        parseFloat(FloorsTotalPrice) +
        parseFloat(DistanceTotalPrice) +
        parseFloat(MovingMaterialTotalPrice);
      setfinalprice(total.toFixed(2));
    }
  }, [discountvalue]);
  useEffect(() => {
    if (discountvalue > 0) {
      const total =
        parseFloat(ProductsTotalPrice) +
        parseFloat(MovingTotalPrice) +
        parseFloat(FloorsTotalPrice) +
        parseFloat(DistanceTotalPrice) +
        parseFloat(MovingMaterialTotalPrice);
      const percentResult = percentage(total, discountvalue);
      setfinalprice((total - percentResult).toFixed(2));
    } else if (parseInt(discountvalue) > 100) {
      const total =
        parseFloat(ProductsTotalPrice) +
        parseFloat(MovingTotalPrice) +
        parseFloat(FloorsTotalPrice) +
        parseFloat(DistanceTotalPrice) +
        parseFloat(MovingMaterialTotalPrice);
      setfinalprice(total.toFixed(2));
    } else {
      const total =
        parseFloat(ProductsTotalPrice) +
        parseFloat(MovingTotalPrice) +
        parseFloat(FloorsTotalPrice) +
        parseFloat(MovingMaterialTotalPrice) +
        parseFloat(DistanceTotalPrice);
      setfinalprice(total.toFixed(2));
    }
  }, [
    ProductsTotalPrice,
    MovingTotalPrice,
    FloorsTotalPrice,
    DistanceTotalPrice,
     MovingMaterialTotalPrice
  ]);

  return (
    <Box>
      <Card sx={{ mb: 9, m: 5 }}>
        <CardHeader
          title="Products Total"
          sx={{ "& .MuiCardHeader-action": { m: 0 } }}
          titleTypographyProps={{
            variant: "h5",
            sx: {
              lineHeight: "8px !important",
              letterSpacing: "0.8px !important",
              color: "black",
            },
          }}
        />
        <Box
          sx={{
            height: 120,
            width: "100%",
            "& .cold": {
              backgroundColor: "#f7f9fb",
              color: "#f7f9fb",
            },
            "& .hot": {
              backgroundColor: "#f7f9fb",
              color: "#f7f9fb",
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
            rowsPerPageOptions={[]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
            hideFooterPagination
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
          />
        </Box>
        <CardHeader
          title="Moving Services Total"
          sx={{ "& .MuiCardHeader-action": { m: 0 } }}
          titleTypographyProps={{
            variant: "h6",
            sx: {
              lineHeight: "8px !important",
              letterSpacing: "0.8px !important",
              color: "black",
            },
          }}
        />
        <Box
          sx={{
            height: 120,
            width: "100%",
            "& .cold": {
              backgroundColor: "#f7f9fb",
              color: "#1a3e72",
            },
            "& .hot": {
              backgroundColor: "#f7f9fb",
              color: "#f7f9fb",
            },
          }}
        >
          {" "}
          <DataGrid
            autoHeight
            getRowId={(row) => row.ms_id}
            columns={columnsServicesMoving}
            rows={mservicesdata}
            getCellClassName={(params) => {
              if (params.row.tittle == "Total") {
                return "cold";
              }
            }}
            hideFooterSelectedRowCount
            hideFooterPagination
            disableSelectionOnClick
            rowsPerPageOptions={[]}
            sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
          />
        </Box>
        <CardHeader
          title="Moving Materials Total"
          sx={{ "& .MuiCardHeader-action": { m: 0 } }}
          titleTypographyProps={{
            variant: "h6",
            sx: {
              lineHeight: "8px !important",
              letterSpacing: "0.8px !important",
              color: "black",
            },
          }}
        />
        <Box
          sx={{
            height: 120,
            width: "100%",
            "& .cold": {
              backgroundColor: "#f7f9fb",
              color: "#1a3e72",
            },
            "& .hot": {
              backgroundColor: "#f7f9fb",
              color: "#f7f9fb",
            },
          }}
        >
          {" "}
          <DataGrid
            autoHeight
            getRowId={(row) => row.mm_id}
            columns={columnsMaterialsMoving}
            rows={mdata}
            getCellClassName={(params) => {
              if (params.row.tittle == "Total") {
                return "cold";
              }
            }}
            hideFooterSelectedRowCount
            hideFooterPagination
            disableSelectionOnClick
            rowsPerPageOptions={[]}
            sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
          />
        </Box>
        <CardHeader
          title="Floors"
          sx={{ "& .MuiCardHeader-action": { m: 0 } }}
          titleTypographyProps={{
            variant: "h6",
            sx: {
              lineHeight: "8px !important",
              letterSpacing: "0.8px !important",
              color: "black",
            },
          }}
        />
        <Box
          sx={{
            height: 140,
            width: "100%",
            "& .cold": {
              backgroundColor: "#f7f9fb",
              color: "#1a3e72",
            },
            "& .hot": {
              backgroundColor: "#f7f9fb",
              color: "#f7f9fb",
            },
          }}
        >
          {" "}
          <DataGrid
            autoHeight
            getRowId={(row) => row.p_id}
            columns={columnsFloor}
            rows={floordata}
            getCellClassName={(params) => {
              if (params.row.tittle == "Total") {
                return "cold";
              }
            }}
            hideFooterSelectedRowCount
            hideFooterPagination
            disableSelectionOnClick
            rowsPerPageOptions={[]}
            sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
          />
        </Box>
        <CardHeader
          title="Distance"
          sx={{ "& .MuiCardHeader-action": { m: 0 } }}
          titleTypographyProps={{
            variant: "h6",
            sx: {
              lineHeight: "8px !important",
              letterSpacing: "0.8px !important",
              color: "black",
            },
          }}
        />
        <Box
          sx={{
            height: 140,
            width: "100%",
            "& .cold": {
              backgroundColor: "#f7f9fb",
              color: "#f7f9fb",
            },
            "& .hot": {
              backgroundColor: "#f7f9fb",
              color: "#f7f9fb",
            },
          }}
        >
          {" "}
          <DataGrid
            autoHeight
            getRowId={(row) => row.p_id}
            columns={columnsDistance}
            rows={distancedata}
            getCellClassName={(params) => {
              if (params.row.tittle == "Total") {
                return "cold";
              }
            }}
            hideFooterSelectedRowCount
            hideFooterPagination
            disableSelectionOnClick
            rowsPerPageOptions={[]}
            sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
          />
        </Box>

        {/* <div className="App">
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        </Pdf>
        <div ref={ref}>
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
      </div> */}
        <Card
          sx={{
            bgcolor: "#85929E",
            display: "grid",
            gridTemplateColumns: "repeat(3, 3fr)",
          }}
        >
          <Typography variant="h5" component="h5" sx={{ m: 3, color: "white" }}>
            Total Price
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            sx={{ m: 3, color: "black" }}
          ></Typography>
          <Typography variant="h5" component="h5" sx={{ m: 3, color: "white" }}>
            {(
              parseFloat(ProductsTotalPrice) +
              parseFloat(MovingTotalPrice) +
              parseFloat(FloorsTotalPrice) +
              parseFloat(DistanceTotalPrice)+
               parseFloat(MovingMaterialTotalPrice)
            ).toFixed(2)}
            €
          </Typography>
        </Card>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            ml: 3,
            mr: 3,
            mt: 5,
            mb: 5,
          }}
        >
          <Box
            sx={{
              gridTemplateColumns: "repeat(3, 3fr)",
            }}
          >
            {/* <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={() => {
                
                if (discountvalue > 1) 
                {
                  setdiscountvalue(discountvalue - 1);
                  const total =
                    parseFloat(ProductsTotalPrice) +
                    parseFloat(MovingTotalPrice) +
                    parseFloat(FloorsTotalPrice) +
                    parseFloat(DistanceTotalPrice);
                  const percentResult = percentage(total, discountvalue);
                  setfinalprice(discountvalue);
                }
                
                
              }}
            >
              <Icon icon="mdi:minus" />
            </Fab> */}
            <TextField
              sx={{ ml: 3, mr: 3 }}
              type="number"
              value={discountvalue}
              size="small"
              label="Discount %"
              placeholder="1"
              onChange={(e) => setdiscountvalue(e.target.value)}
              //onFocus={(e) => setFocus(e.target.name)}
            />
            {/* <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={() => {
                setdiscountvalue(discountvalue + 1);
                const total =
                  (parseFloat(ProductsTotalPrice) +
                  parseFloat(MovingTotalPrice) +
                  parseFloat(FloorsTotalPrice) +
                  parseFloat(DistanceTotalPrice));
                const percentResult = percentage(total, discountvalue);
                setfinalprice(discountvalue);
                
              }}
            >
              <Icon icon="mdi:plus" />
            </Fab> */}
          </Box>
          <Box>
            <TextField
              sx={{ ml: 3, mr: 3 }}
              type="number"
              value={finalprice}
              size="large"
              label="Final Price"
              placeholder="1"
              onChange={(e) => setfinalprice(e.target.value)}
              //onFocus={(e) => setFocus(e.target.name)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            ml: 6,
            mr: 6,
            mt: 5,
            mb: 5,
          }}
        >
          <Button variant="contained" color="success" sx={{ mr: 5 }}>
            Convert into Estimates
          </Button>
          <Button variant="contained" color="error" sx={{ ml: 5 }}>
            cancel
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default InvoiceListTable;
