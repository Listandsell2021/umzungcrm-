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






// ** Styles Import
import "react-credit-cards/es/styles-compiled.css";






const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));





const MovingMaterial = ({ invoiceData, movingdata, id }) => {
  // ** State
  const [pageSize, setPageSize] = useState(7);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pdata, setpdata] = useState([]);
  
  const [mlist, setmlist] = useState([]);
  const [refreshdata, setrefreshdata] = useState(true);
  // ** Var
  
 

  const columns = [
    {
      flex: 0,
      field: "qty",
      minWidth: 50,
      headerName: "",
      renderCell: ({ row }) => {
        var qty_new;
        var qtysum;

        var qty_new = qty(row.mm_id);

        if (qty_new.length != 0) {
          //console.log(row)
          var qty_new = qty(row.mm_id);
          qty_new = qty_new[0].quantity;
          qtysum = qty_new;
        }

        return (
          // <Link href={`/apps/invoice/preview/${row.id}`} passHref>
          <StyledLink>{qtysum}x</StyledLink>
          // </Link>
        );
      },
    },

    {
      flex: 0.2,
      field: "title",
      minWidth: 90,
      headerName: "#Title",

      renderCell: ({ row }) => {
        return (
          // <Link href={`/apps/invoice/preview/${row.id}`} passHref>

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
                {row.size.length}x{row.size.height}x{row.size.breath}
              </Typography>
              {/* </Link> */}
            </Box>
          </Box>

          // </Link>
        );
      },
    },
    {
      flex: 0.2,
      field: "descriptions",
      minWidth: 90,
      headerName: "Descriptions",

      renderCell: ({ row }) => {
        return (
          // <Link href={`/apps/invoice/preview/${row.id}`} passHref>
          <StyledLink>{row.descriptions}</StyledLink>
          // </Link>
        );
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
        console.log(filteredX);
        setpdata(filteredX);

        
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
    <>
      <DataGrid
        autoHeight
        getRowId={(row) => row.mm_id}
        columns={columns}
        rows={pdata}
        pageSize={pageSize}
        disableSelectionOnClick
        hideFooterSelectedRowCount
        hideFooterPagination
        
        
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        sx={{
          "& .MuiDataGrid-columnHeaders": { borderRadius: 0 },
         
        }}
      />
    </>
  );
};

export default MovingMaterial;
