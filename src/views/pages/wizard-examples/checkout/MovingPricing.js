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
  const [mlist, setmlist] = useState([]);
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
      field: "title",
      minWidth: 90,
      headerName: "",

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
          totalcubicsum = parseInt(row.size.cubic_meter) * parseInt(qtysum);
        } else {
          var qty_new = qty(row.mm_id);
          if (qty_new.length != 0) {
            qty_new = qty_new[0].quantity;

            totalcubicsum = parseInt(row.size.cubic_meter) * parseInt(qty_new);
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
  ];

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
          .map((item) => item.size.cubic_meter)
          .reduce((prev, next) => prev + next);

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

          mm_id: "",
        };
        setpdata([a]);
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

  return (
    <Card>
      <CardHeader
        title="Moving Materials Total"
        sx={{ "& .MuiCardHeader-action": { m: 0 } }}
        titleTypographyProps={{
          variant: "h6",
          sx: {
            lineHeight: "32px !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <Box
        sx={{
          height: 150,
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
    </Card>
  );
};

export default InvoiceListTable;
