// ** React Imports
import { useState, useEffect } from "react";
import React from "react";
// ** MUI Imports
import Card from "@mui/material/Card";
import Step from "@mui/material/Step";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import MuiStepper from "@mui/material/Stepper";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MovingMaterial from "src/views/pages/wizard-estimates/checkout/MovingMaterial";
import MovingProducts from "src/views/pages/wizard-estimates/checkout/MovingProducts";
import MovingService from "src/views/pages/wizard-estimates/checkout/MovingService";
import Box from "@mui/material/Box";
 import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import PreviewAction from "src/views/pages/wizard-estimates/checkout/PreviewAction";
import Pdf from "react-to-pdf";
import { PDFExport } from "@progress/kendo-react-pdf";
// ** Icon Imports
import Icon from "src/@core/components/icon";
const ref = React.createRef();

const CheckoutWizard = ({ id, Data }) => {
   const theme = useTheme();
  const [Datas, setData] = useState([]);
  const [movingdata, setmovingdata] = useState([]);
  const [productdata, setproductdata] = useState([]);
  const [movingservices, setmovingservices] = useState([]);
  const [show, setShow] = useState("none");
  const [discount, setdiscount] = useState(0);

   const options = {
     
     format: [4, 2],
   };
   

   const pdfExportComponent = React.useRef(null);
  useEffect(() => {
    var ids = { id: "c" + id };

    axios
      .post("https://umzungcrmtest.vercel.app/api/getLeadAdminbyid", { ids })
      .then((response) => {
        setData(response.data[0]);
        

          setdiscount(
            parseFloat(response.data[0].priceby_calculation) -
              parseFloat(response.data[0].priceby_admin)
          );



        
        //setloaddata(true);
        //setrefreshdata(false);
      })
      .catch(() => {
        setData(null);
        //setloaddata(false);
      });
      var storedData = window.localStorage.getItem("userData");

      storedData = JSON.parse(storedData);
      var ids = { id: storedData.id };
      
      
      axios
        .post("https://umzungcrmtest.vercel.app/api/getMovingbyAdmin", { ids })
        .then((response) => {
          setmovingdata(response.data);
          
        })
        .catch(() => {
          setData(null);
        });
        axios
          .post("https://umzungcrmtest.vercel.app/api/getProductbyAdmin", { ids })
          .then((response) => {
            setproductdata(response.data);
          })
          .catch(() => {
            setData(null);
          });
          axios
            .post("https://umzungcrmtest.vercel.app/api/getMovingServicesByadmin", { ids })
            .then((response) => {
              setmovingservices(response.data);
            })
            .catch(() => {
              setData(null);
            });
  }, []);
  
  const Componetmovingdetails = ({ first, second, third, color }) => {
    return (
      <>
        <CardContent
          sx={{ display: "grid", gridTemplateColumns: "repeat(3, 3fr)" }}
        >
          <Typography
            variant="subtitle1"
            justifyContent="left"
            alignItems="left"
            sx={{ color: "black", align: "center" }}
            component="subtitle1"
          >
            {first}
          </Typography>
          <Typography
            variant="subtitle1"
            justifyContent="left"
            alignItems="left"
            sx={{ color: color, align: "center" }}
            component="subtitle1"
          >
            {second}
          </Typography>
          <Typography
            variant="subtitle1"
            justifyContent="left"
            alignItems="left"
            sx={{ color: color, align: "center" }}
            component="subtitle1"
          >
            {third}
          </Typography>
        </CardContent>
      </>
    );
  };
  const ComponetmovingPrice = ({
    mainHeading,
    first,
    second,
    shortheading,
    color,
    pricelarge,
    pricesmall,volume
  }) => {
    return (
      <>
        <CardContent sx={{ display: "grid", gridAutoColumns: "1fr", gap: 1 }}>
          <Typography
            variant="h6"
            justifyContent="left"
            alignItems="left"
            sx={{
              gridRow: "1",
              gridColumn: "span 3",
              color: "black",
              align: "center",
            }}
            component="h6"
          >
            {mainHeading}
          </Typography>
          {pricelarge != "" && (
            <Typography
              variant="h6"
              justifyContent="left"
              alignItems="left"
              sx={{
                color: "black",
                align: "center",
                gridRow: "1",
                gridColumn: "4 / 5",
              }}
              component="h6"
            >
              {pricelarge}
            </Typography>
          )}
        </CardContent>
        {first != "" && pricesmall != "" && (
          <CardContent
            sx={{
              display: "grid",
              gridAutoColumns: "1fr",
              gap: 2,
            }}
          >
            {volume ? (
              <Typography
                variant="subtitle1"
                justifyContent="left"
                alignItems="left"
                component="subtitle1"
                sx={{
                  gridRow: "1",
                  gridColumn: "span 3",
                  ml: 4,
                  color: "black",
                }}
              >
                {first} {volume} m<sup style={{ width: 45, height: 40 }}>3</sup>
              </Typography>
            ) : (
              <Typography
                variant="subtitle1"
                justifyContent="left"
                alignItems="left"
                component="subtitle1"
                sx={{
                  gridRow: "1",
                  gridColumn: "span 3",
                  ml: 4,
                  color: "black",
                }}
              >
                {first}
              </Typography>
            )}

            <Typography
              variant="subtitle1"
              direction="row"
              justifyContent="end"
              sx={{
                color: "black",
                align: "right",
                gridRow: "1",
                gridColumn: "4 / 5",
              }}
              component="subtitle1"
            >
              {pricesmall}
            </Typography>
          </CardContent>
        )}
        {shortheading != "" && (
          <CardContent
            sx={{ display: "grid", gridTemplateColumns: "repeat(2, 2fr)" }}
          >
            <Typography
              variant="subtitle2"
              justifyContent="left"
              alignItems="left"
              sx={{ color: "grey", align: "center", ml: 4 }}
              component="subtitle2"
            >
              {shortheading}
            </Typography>
          </CardContent>
        )}
      </>
    );
  };
  
  return (
    <>
      {Datas.length == 0 ? (
        <Box component={"div"} textAlign="center">
          <h1>Loading....</h1>
        </Box>
      ) : (
        <Box>
          <Grid container spacing={6}>
            <Grid item xl={9} md={8} xs={12}>
              <PDFExport paperSize="A4" scale={0.7} ref={pdfExportComponent}>
                <Box>
                  <Card>
                    <Box sx={{ mt: 6, ml: 6 }}>
                      <svg
                        width={80}
                        fill="none"
                        height={52}
                        viewBox="0 0 268 150"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          rx="25.1443"
                          width="50.2886"
                          height="143.953"
                          fill={theme.palette.primary.main}
                          transform="matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)"
                        />
                        <rect
                          rx="25.1443"
                          width="50.2886"
                          height="143.953"
                          fillOpacity="0.4"
                          fill="url(#paint0_linear_7821_79167)"
                          transform="matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)"
                        />
                        <rect
                          rx="25.1443"
                          width="50.2886"
                          height="143.953"
                          fill={theme.palette.primary.main}
                          transform="matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)"
                        />
                        <rect
                          rx="25.1443"
                          width="50.2886"
                          height="143.953"
                          fill={theme.palette.primary.main}
                          transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                        />
                        <rect
                          rx="25.1443"
                          width="50.2886"
                          height="143.953"
                          fillOpacity="0.4"
                          fill="url(#paint1_linear_7821_79167)"
                          transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                        />
                        <rect
                          rx="25.1443"
                          width="50.2886"
                          height="143.953"
                          fill={theme.palette.primary.main}
                          transform="matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)"
                        />
                        <defs>
                          <linearGradient
                            y1="0"
                            x1="25.1443"
                            x2="25.1443"
                            y2="143.953"
                            id="paint0_linear_7821_79167"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop />
                            <stop offset="1" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient
                            y1="0"
                            x1="25.1443"
                            x2="25.1443"
                            y2="143.953"
                            id="paint1_linear_7821_79167"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop />
                            <stop offset="1" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </Box>

                    <Box sx={{ ml: 5, mt: 14 }}>
                      <CardContent>
                        <Typography
                          variant="caption"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ color: "primary.main", align: "center" }}
                          component="caption"
                        >
                          MOVING OFFER
                        </Typography>
                        {/** Moving details */}
                        <Typography
                          variant="h6"
                          display="flex"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "black", align: "center" }}
                          component="h6"
                        >
                          Your Moving Details
                        </Typography>
                      </CardContent>
                      <CardContent
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 3fr)",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "black", align: "center" }}
                          component="subtitle1"
                        >
                          Name
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "grey", align: "center" }}
                          component="subtitle1"
                        >
                          {Datas.client_details.full_name}
                        </Typography>
                      </CardContent>
                      <CardContent
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 3fr)",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "black", align: "center" }}
                          component="subtitle1"
                        >
                          E-mail
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "grey", align: "center" }}
                          component="subtitle1"
                        >
                          {Datas.client_details.email}
                        </Typography>
                      </CardContent>
                      <CardContent
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 3fr)",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "black", align: "center" }}
                          component="subtitle1"
                        >
                          Phone
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "grey", align: "center" }}
                          component="subtitle1"
                        >
                          {Datas.client_details.Phone_no}
                        </Typography>
                      </CardContent>
                      <CardContent
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 3fr)",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "black", align: "center" }}
                          component="subtitle1"
                        >
                          Move-id
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "grey", align: "center" }}
                          component="subtitle1"
                        >
                          #{Datas.c_id}
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 15 }}>
                      <Box sx={{ backgroundColor: "#f7f9fb", p: 4 }}>
                        <Componetmovingdetails
                          first={""}
                          second={"MOVE OUT"}
                          third={"MOVE IN"}
                          color={"primary.main"}
                        />
                        <Componetmovingdetails
                          first={"Date"}
                          second={Datas.moving_dates.from}
                          third={Datas.moving_dates.to}
                          color={"grey"}
                        />

                        <Componetmovingdetails
                          first={"Address"}
                          second={
                            Datas.from_address.street_name +
                            " " +
                            Datas.from_address.postcode +
                            " " +
                            Datas.from_address.city
                          }
                          third={
                            Datas.to_address.street_name +
                            " " +
                            Datas.to_address.postcode +
                            " " +
                            Datas.to_address.city
                          }
                          color={"grey"}
                        />

                        <Componetmovingdetails
                          first={"Floor"}
                          second={Datas.from_details.floor}
                          third={Datas.to_details.floor}
                          color={"grey"}
                        />
                        <Componetmovingdetails
                          first={"Elevator Weight"}
                          second={Datas.from_details.elevator.weight}
                          third={Datas.to_details.elevator.weight}
                          color={"grey"}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ mb: 175 }}></Box>
                    <Box sx={{ pl: 15, pr: 15, mt: 15 }}>
                      <Typography
                        variant="h6"
                        display="flex"
                        justifyContent="left"
                        alignItems="left"
                        sx={{ color: "black", align: "center", mb: 3 }}
                        component="h6"
                      >
                        Your Move Offer
                      </Typography>
                      <Box sx={{ backgroundColor: "#f7f9fb", pl: 5, pt: 3 }}>
                        <ComponetmovingPrice
                          mainHeading={"Moving Products"}
                          first={"Volume"}
                          volume={Datas.total_cubic_meter}
                          second={""}
                          shortheading={""}
                          color={"black"}
                          pricelarge={""}
                          pricesmall={"12 EUR"}
                        />
                        <ComponetmovingPrice
                          mainHeading={""}
                          first={"Products Services"}
                          second={""}
                          shortheading={""}
                          color={"black"}
                          pricelarge={""}
                          pricesmall={
                            Datas.total_product_services_price + " EUR"
                          }
                        />
                        <Divider />
                        <ComponetmovingPrice
                          mainHeading={"Moving Services"}
                          first={""}
                          second={""}
                          shortheading={""}
                          color={"black"}
                          pricelarge={Datas.moving_total_price + " EUR"}
                          pricesmall={""}
                        />
                        <Divider />
                        {/*/get from database*/}
                        <ComponetmovingPrice
                          mainHeading={"Moving Materials"}
                          first={"Volume"}
                          volume={"377"}
                          second={"v"}
                          shortheading={""}
                          color={"black"}
                          pricelarge={""}
                          pricesmall={"12 EUR"}
                        />
                        <ComponetmovingPrice
                          mainHeading={""}
                          first={"Materials Price"}
                          second={""}
                          shortheading={""}
                          color={"black"}
                          pricelarge={""}
                          pricesmall={"13 EUR"}
                        />
                        <Divider />
                        <ComponetmovingPrice
                          mainHeading={"Floors"}
                          first={""}
                          second={""}
                          shortheading={""}
                          color={"black"}
                          pricelarge={Datas.floors_total_price + " EUR"}
                          pricesmall={""}
                        />
                        <Divider />
                        <ComponetmovingPrice
                          mainHeading={"Distance"}
                          first={Datas.distance + " km"}
                          second={""}
                          shortheading={""}
                          color={"black"}
                          pricelarge={""}
                          pricesmall={Datas.distance_total_price + " EUR"}
                        />
                        <Divider />

                        {discount != 0 ? (
                          <ComponetmovingPrice
                            mainHeading={"Discount"}
                            first={""}
                            second={""}
                            shortheading={""}
                            color={"black"}
                            pricelarge={"-" + discount}
                            pricesmall={""}
                          />
                        ) : null}
                      </Box>
                    </Box>
                    <Box sx={{ pl: 15, pr: 15, pb: 15 }}>
                      <Box sx={{ backgroundColor: "#edf2f8", pl: 5, pt: 3 }}>
                        <ComponetmovingPrice
                          mainHeading={"Total"}
                          first={""}
                          second={""}
                          shortheading={""}
                          color={"black"}
                          pricelarge={Datas.priceby_admin}
                          pricesmall={""}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ mb: 80 }}></Box>
                    <Box sx={{ pl: 15, pr: 15, pb: 15 }}>
                      <Box sx={{ pl: 5, pt: 3 }}>
                        <Typography
                          variant="h6"
                          display="flex"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "black", align: "center", mb: 3 }}
                          component="h6"
                        >
                          Your Moving Products List
                        </Typography>

                        <MovingProducts
                          productdata={productdata}
                          plist={Datas.product_list}
                          id={id}
                        />
                        <Divider
                          sx={{ color: "black", borderBottomWidth: 5 }}
                        />
                        <Typography
                          variant="h6"
                          display="flex"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "black", align: "center", mb: 3 }}
                          component="h6"
                        >
                          Your Moving Materials List
                        </Typography>
                        <MovingMaterial
                          movingdata={movingdata}
                          plist={Datas.product_list}
                          id={id}
                        />
                        <Divider
                          sx={{ color: "black", borderBottomWidth: 5 }}
                        />
                        <Typography
                          variant="h6"
                          display="flex"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ color: "black", align: "center", mb: 3 }}
                          component="h6"
                        >
                          Your Moving Services List
                        </Typography>
                        <MovingService
                          movingservices={movingservices}
                          plist={Datas.product_list}
                          id={id}
                        />
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </PDFExport>
            </Grid>
            <Grid item xl={3} md={4} xs={12}>
              <PreviewAction
                id={id}
                download={() => {
                  if (pdfExportComponent.current) {
                    setShow("block");
                    pdfExportComponent.current.save();
                    //setShow("false");
                  }
                }}
                
                
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CheckoutWizard;
