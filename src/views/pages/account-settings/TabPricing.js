// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports
import Key from "mdi-material-ui/Key";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";
import axios from "axios";
const TabPricing = () => {
  // ** States

  const [cubicprice, setcubicprice] = useState("");
const [costperkm, setcostperkm] = useState("");
const [costperfloor, setcostperfloor] = useState("");
const [costperwalkway, setcostperwalkway] = useState("");
const [costwalking, setcostwalking] = useState("");
const [number24, setnumber24] = useState("");
const [number49, setnumber49] = useState("");
  const [data, setdata] = useState("");
  // Handle Current Password
  const handlecubicprice = (prop) => (event) => {
    setcubicprice(event.target.value);
  };
  const handlecostperkm = (prop) => (event) => {
    setcostperkm(event.target.value);
  };
  const handlecostperfloor = (prop) => (event) => {
    setcostperfloor(event.target.value);
  };
  const handlecostperwalkway = (prop) => (event) => {
    setcostperwalkway(event.target.value);
  };
  const handlecostwalking = (prop) => (event) => {
    setcostwalking(event.target.value);
  };
  const handlenumber24 = (prop) => (event) => {
    setnumber24(event.target.value);
  };
  const handlenumber49 = (prop) => (event) => {
    setnumber49(event.target.value);
  };
  
  useEffect(() => {
    
     var storedData = window.localStorage.getItem("userData");
     storedData = JSON.parse(storedData);
     var ids = { id: storedData.id };
     
    axios
      .post("https://umzungcrmtest.vercel.app/api/getAdminSettings", { ids })
      .then((response) => {
        setdata(response.data[0]);

        setcubicprice(response.data[0].cost_per_meter_square);
        setcostperkm(response.data[0].cost_per_km);
        setcostperfloor(response.data[0].cost_per_floor);
        setcostperwalkway(response.data[0].cost_per_walkaway);
        setcostwalking(response.data[0].cost_walking);
        setnumber24(response.data[0].cost_item_number24);
        setnumber49(response.data[0].cost_item_number49);

      })
      .catch(() => {});
  }, []);
function updateSettings()
{
var datanew = {
  "sa_id": data.sa_id,
  "a_id": data.a_id,
  "genral": {
    "logo": data.genral.logo,
    "phone": data.genral.phone,
    "address": data.genral.address,
    "color": { "primary": data.genral.color.primary, "secondary": data.genral.color.secondary },
  },
  "email": { smtp_email: data.email.smtp_email },
  "cost_per_meter_square": cubicprice,
  "cost_per_km": costperkm,
  "cost_per_floor": costperfloor,
  "cost_per_walkaway": costperwalkway,
  "cost_walking":costwalking,
  "cost_item_number24":number24,
  "cost_item_number49":number49


};

 axios
   .post("https://umzungcrmtest.vercel.app/api/updateAdminSettings", { datanew })
   .then((response) => {
     console.log(response);
   })
   .catch(() => {});

}

  

  return (
    <form>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} sx={{ mt: 5, mb: [0, 6] }}>
            <Typography variant="h6" component="h4" sx={{ mb: 2 }}>
              Core Values
            </Typography>
            <Divider sx={{ mt: 0, mb: 6 }} />
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    Cubic m<sup style={{ width: 45, height: 40 }}>3</sup> Price
                  </InputLabel>
                  <OutlinedInput
                    label={"Cubic m3 Price"}
                    value={cubicprice}
                    type={"number"}
                    onChange={handlecubicprice("currentPassword")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    Per Km Price
                  </InputLabel>
                  <OutlinedInput
                    label={"Per Km Price"}
                    value={costperkm}
                    type={"number"}
                    onChange={handlecostperkm("currentPassword")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    Per Floor Price
                  </InputLabel>
                  <OutlinedInput
                    label={"Per Floor Price"}
                    value={costperfloor}
                    type={"number"}
                    onChange={handlecostperfloor("currentPassword")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    Per Walkway Price
                  </InputLabel>
                  <OutlinedInput
                    label={"Per Walkway Price"}
                    value={costperwalkway}
                    type={"number"}
                    onChange={handlecostperwalkway("currentPassword")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    Walking Distance Price
                  </InputLabel>
                  <OutlinedInput
                    label={"Walking Distance Price"}
                    value={costwalking}
                    type={"number"}
                    onChange={handlecostwalking("currentPassword")}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Typography variant="h6" component="h4" sx={{ mb: 2, mt: 2 }}>
              Additional Values
            </Typography>
            <Divider sx={{ mt: 0, mb: 6 }} />
            <Grid item xs={12}>
              <Box
                sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
              >
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    Number of Items Price less than 24
                  </InputLabel>
                  <OutlinedInput
                    label={"Number of Items Price less than 24 items"}
                    value={number24}
                    type={"number"}
                    onChange={handlenumber24("currentPassword")}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ ml: 2 }}>
                  <InputLabel htmlFor="account-settings-current-password">
                    Number of Items Price greater than 49
                  </InputLabel>
                  <OutlinedInput
                    label={" Number of Items Price greater than 49 items"}
                    value={number49}
                    type={"number"}
                    onChange={handlenumber49("currentPassword")}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              mt: 2.5,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <img
              alt="avatar"
              src="/images/pages/account-settings-security-illustration.png"
            />
          </Grid>
        </Grid>

        <Divider sx={{ mt: 0, mb: 6 }} />

        <Box>
          <Button
            variant="contained"
            sx={{ mr: 4 }}
            onClick={() => {
              updateSettings();
            }}
          >
            Save Changes
          </Button>
        </Box>
      </CardContent>
    </form>
  );
};

export default TabPricing;
