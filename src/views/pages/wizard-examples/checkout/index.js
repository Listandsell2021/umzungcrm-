// ** React Imports
import { useState, useEffect } from "react";

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

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Step Components
import StepCart from "src/views/pages/wizard-examples/checkout/StepCart";
import StepAddress from "src/views/pages/wizard-examples/checkout/StepAddress";
import StepPayment from "src/views/pages/wizard-examples/checkout/StepPayment";
import StepConfirmation from "src/views/pages/wizard-examples/checkout/StepConfirmation";
import UsersInvoiceListTable from "src/views/apps/adminleads/view/UsersInvoiceListTable";
import MovingTable from "src/views/pages/wizard-examples/checkout/MovingTable";
import ProductPricing from "src/views/pages/wizard-examples/checkout/ProductPricing";
import MovingPricing from "src/views/pages/wizard-examples/checkout/MovingPricing";
import MovingMaterial from "src/views/pages/wizard-examples/checkout/MovingMaterial";

// ** Styled Components
import StepperWrapper from "src/@core/styles/mui/stepper";

const steps = [
  {
    title: "User Details",

    icon: "/images/icons/project-icons/user.png",
  },
  {
    title: "Address",
    icon: "/images/icons/project-icons/deliver.png",
  },
  {
    title: "Relocation Info",
    icon: "/images/icons/project-icons/move.png",
  },
  {
    title: "Moving Products",
    icon: "/images/icons/project-icons/furnitures.png",
  },
  {
    title: "Moving Services",
    icon: "/images/icons/project-icons/moving.png",
  },
  {
    title: "Moving Materials",
    icon: "/images/icons/project-icons/open-box.png",
  },
  {
    title: "Price",
    icon: "/images/icons/project-icons/euro.png",
  },
];

const Stepper = styled(MuiStepper)(({ theme }) => ({
  margin: "auto",
  maxWidth: 800,
  justifyContent: "space-around",
  "& .MuiStep-root": {
    cursor: "pointer",
    textAlign: "center",
    paddingBottom: theme.spacing(8),
    "& .step-title": {
      fontSize: "1rem",
    },
    "&.Mui-completed + svg": {
      color: theme.palette.primary.main,
    },
    "& + svg": {
      display: "none",
      color: theme.palette.text.disabled,
    },
    "& .MuiStepLabel-label": {
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
      svg: {
        marginRight: theme.spacing(1.5),
        fill: theme.palette.text.primary,
      },
      "&.Mui-active, &.Mui-completed": {
        "& .MuiTypography-root": {
          color: theme.palette.primary.main,
        },
        "& svg": {
          fill: theme.palette.primary.main,
        },
      },
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: 0,
      "& + svg": {
        display: "block",
      },
      "& .MuiStepLabel-label": {
        display: "block",
      },
    },
  },
}));

const CheckoutWizard = ({ id }) => {
  // ** States

  const [activeStep, setActiveStep] = useState(0);
  const [fromStreetName, setFromStreetname] = useState("");
  const [postcode,setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [toStreetName, setToStreetname] = useState("");
  const [moveinPostcode, setMoveinPostCode] = useState("");
  const [moveinCity, setMoveinCity] = useState("");
  // relocation info
  const [moveoutLivingType, setMoveoutLivingType] = useState("");
  const [moveoutLivingSpace, setMoveoutLivingSpace] = useState("");
  const [person, setPerson] = useState("");
  const [moveoutpackboxes, setMoveoutPackboxes] = useState("");
  const [moveoutFloor, setMoveoutFloor] = useState("");
  const [moveoutFootPath, setMoveoutFootPath] = useState("");
  const [moveoutStops, setMoveoutStops] = useState("");

  const [moveinLivingType, setMoveinLivingType] = useState("");
  const [moveinLivingSpace, setMoveinLivingSpace] = useState("");
  const [moveinFloor, setMoveinFloor] = useState("");
  const [moveinFootPath, setMoveinFootPath] = useState("");
  const [moveinStops, setMoveinStops] = useState("");

  const [movingDateType, setMovingDatetype] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  const [moveoutElevatorType, setmoveoutElevatorType] = useState("");
  const [moveoutElevatorWeight, setmoveoutElevatorWeight] = useState("");
  const [moveinElevatorType, setmoveinElevatorType] = useState("");
  const [moveinElevatorWeight, setmoveinElevatorWeight] = useState("");
const [refreshdata, setrefreshdata] = useState(true);
  const [from_streetaddress, setfrom_streetaddress] = useState("");
  const [movingservicesdata, setmovingservicesdata] = useState([]);
  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleClickScroll = (index) => {
    if (index == 3) {
      setActiveStep(index);
    } else if (index == 4) {
      setActiveStep(index);
    } else if (index == 5) {
      setActiveStep(index);
    
    } else if (index == 6) {
      setActiveStep(index);
    }else {
      setActiveStep(0);
      const element = document.getElementById(String(index));

      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
async function updatedata(datanew)
{
  axios
    .post("https://umzungcrmtest.vercel.app/api/updatAdminLeadDetails", { datanew })
    .then((response) => {
      console.log(response.data);
      setrefreshdata(true);
    })
}
  const getStepContent = (step) => {
    const [fullname, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [Phone_no, setPhone_no] = useState("");
    const [data, setData] = useState([]);
    const [productdata, setproductdata] = useState([]);
    const [movingdata, setmovingdata] = useState([]);
    
    const [loaddata, setloaddata] = useState(false);
    
     // {"_id":{"$oid":"63ac0e0b1be6535b45c08206"},"sa_id":"sa1","a_id":"a3","c_id":"c1","from_address":{"street_name":"weitbrcuher str 3a","postcode":"12349","city":"berlin","country":"DE"},"to_address":{"street_name":"Asbestweg 3a","postcode":"12349","city":"Berlin","country":"DE"},"from_details":{"living_type":"house","no_stops":"1","living_space":"1","persons":"1","packboxes":"1","floor":"1","footpath":"1","elevator":{"elevator_type":"no","weight":"1"}},"to_details":{"living_type":"house","no_stops":"0","living_space":"0","floor":"3","footpath":"0","elevator":{"elevator_type":"no","weight":"0"}},"moving_dates":{"moving_date_type":"fixed","from":"12/05/2022","to":"13/05/2022"},"product_list":[{"quantity":"2","p_id":"p2"}],"moving_material_list":[{"mm_id":"m2","quantity":"5"}],"priceby_calculation":"500","priceby_admin":"400","client_details":{"Phone_no":"123456","email":"test@test.com","full_name":"Test LeadAdmin"},"status":"pending"}
    useEffect(() => {
      var ids = { id: "c" + id };

      axios
        .post("https://umzungcrmtest.vercel.app/api/getLeadAdminbyid", { ids })
        .then((response) => {
          setData(response.data[0]);
          setloaddata(true);
          setrefreshdata(false);
        })
        .catch(() => {
          setData(null);
          setloaddata(false);
        });

      var storedData = window.localStorage.getItem("userData");

      storedData = JSON.parse(storedData);
      var ids = { id: storedData.id };
      console.log(data.product_list);
      axios
        .post("https://umzungcrmtest.vercel.app/api/getProductbyAdmin", { ids })
        .then((response) => {
          setproductdata(response.data);
        })
        .catch(() => {
          setData(null);
        });
      axios
        .post("https://umzungcrmtest.vercel.app/api/getMovingbyAdmin", { ids })
        .then((response) => {
          setmovingdata(response.data);
        })
        .catch(() => {
          setData(null);
        });
        axios
          .post("https://umzungcrmtest.vercel.app/api/getMovingServicesByadmin", { ids })
          .then((response) => {
            setmovingservicesdata(response.data);
          })
          .catch(() => {
            setData(null);
          });
        
    }, [refreshdata]);

    useEffect(() => {
      if (data.length != 0) {
        setfullname(data.client_details.full_name);
        setemail(data.client_details.email);
        setPhone_no(data.client_details.Phone_no);
        setFromStreetname(data.from_address.street_name);
        setPostCode(data.from_address.postcode);
        setCity(data.from_address.city);
        setToStreetname(data.to_address.street_name);
        setMoveinPostCode(data.to_address.postcode);
        setMoveinCity(data.to_address.city);

        setMoveoutLivingType(data.from_details.living_type);
        setMoveoutLivingSpace(data.from_details.living_space);
        setPerson(data.from_details.persons);
        setMoveoutPackboxes(data.from_details.packboxes);
        setMoveoutFloor(data.from_details.floor);
        setMoveoutFootPath(data.from_details.footpath);
        setMoveoutStops(data.from_details.no_stops);

        setMoveinLivingType(data.to_details.living_type);
        setMoveinLivingSpace(data.to_details.living_space);
        setMoveinFloor(data.to_details.floor);
        setMoveinFootPath(data.to_details.footpath);
        setMoveinStops(data.to_details.no_stops);

        setMovingDatetype(data.moving_dates.moving_date_type);
        setToDate(data.moving_dates.to);
        setFromDate(data.moving_dates.from);

        const moveoutElevatorValue = JSON.stringify(data.from_details.elevator);
        const moveoutElevatorValues = JSON.parse(moveoutElevatorValue);
        const moveinElevatorValue = JSON.stringify(data.to_details.elevator);
        const moveinElevatorValues = JSON.parse(moveinElevatorValue);

        setmoveoutElevatorType(moveoutElevatorValues.elevator_type);
        setmoveoutElevatorWeight(moveoutElevatorValues.weight);

        setmoveinElevatorType(moveinElevatorValues.elevator_type);
        setmoveinElevatorWeight(moveinElevatorValues.weight);
      }
    }, [loaddata, refreshdata]);
    switch (step) {
      /*******  user Details view */

      case 0:
        return (
          <Grid sx={{}}>
            <Grid id={"0"}>
              <Grid lg={8}>
                <Typography variant="h6" sx={{ mb: 4 }}>
                  Details
                </Typography>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box
                    sx={{
                      mb: 7,
                    }}
                  >
                    <TextField
                      sx={{
                        mr: 5,
                      }}
                      value={fullname}
                      label="Name"
                      onChange={(e) => setfullname(e.target.value)}
                      placeholder="John Doe"
                    />

                    <TextField
                      value={email}
                      label="E-mail"
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="abc@umzung.de"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Phone no"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Addressss */}

            <Divider sx={{ mt: 7 }} />
            <Typography variant="h6" sx={{ mt: 6 }}>
              Address
            </Typography>
            <Grid id={"1"} container spacing={8} sx={{ mt: 1 }}>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Move - Out address
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={fromStreetName}
                      label="Street name"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="asbestweg"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={postcode}
                      label="Postcode"
                      onChange={(e) => setPostCode(e.target.value)}
                      placeholder="postcode"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={city}
                      label="City"
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="city"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Move - In address
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={toStreetName}
                      label="Street name"
                      onChange={(e) => setToStreetname(e.target.value)}
                      placeholder="to Street Nmae"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={moveinPostcode}
                      label="Postcode"
                      onChange={(e) => setMoveinPostCode(e.target.value)}
                      placeholder="postcode"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={moveinCity}
                      label="City"
                      onChange={(e) => setMoveinCity(e.target.value)}
                      placeholder="city"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/*relaocation */}

            <Divider sx={{ mt: 7 }} />
            <Typography variant="h6" sx={{ mt: 6 }}>
              Relocation Info
            </Typography>
            <Grid id={"2"} container spacing={8} sx={{ mt: 1 }}>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Move - Out
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={moveoutLivingType}
                      label="Living Type"
                      onChange={(e) => setMoveoutLivingType(e.target.value)}
                      placeholder="Living type"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={moveoutLivingSpace}
                      label="Living Space"
                      onChange={(e) => setMoveoutLivingSpace(e.target.value)}
                      placeholder="Living Space"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={person}
                      label="Persons"
                      onChange={(e) => setPerson(e.target.value)}
                      placeholder="Person"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={moveoutpackboxes}
                      label="Packboxes"
                      onChange={(e) => setMoveoutPackboxes(e.target.value)}
                      placeholder="Packboxes"
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={moveoutFloor}
                      label="Floor"
                      onChange={(e) => setMoveoutFloor(e.target.value)}
                      placeholder="floor"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={moveoutFootPath}
                      label="Footpath"
                      onChange={(e) => setMoveoutFootPath(e.target.value)}
                      placeholder="footpath"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    {/* <TextField
                      value={Phone_no}
                      label="Floor"
                      onChange={(e) => setMoveoutFloor(e.target.value)}
                      placeholder="floor"
                    /> */}
                    <TextField
                      value={moveoutStops}
                      label="Stops"
                      onChange={(e) => setMoveoutStops(e.target.value)}
                      placeholder="stops"
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 4 }}>
                      Elevator
                    </Typography>
                    <TextField
                      value={moveoutElevatorType}
                      label="Elevator Type"
                      onChange={(e) => setmoveoutElevatorType(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={moveoutElevatorWeight}
                      label="weight"
                      onChange={(e) => setmoveoutElevatorWeight(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Move - In
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={moveinLivingType}
                      label="Living Type"
                      onChange={(e) => setMoveinLivingType(e.target.value)}
                      placeholder="Living Type"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={moveinLivingSpace}
                      label="Living Space"
                      onChange={(e) => setMoveinLivingSpace(e.target.value)}
                      placeholder="Living Space"
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={moveinFloor}
                      label="Floor"
                      onChange={(e) => setMoveinFloor(e.target.value)}
                      placeholder="floor"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={moveinFootPath}
                      label="Footpath"
                      onChange={(e) => setMoveinFootPath(e.target.value)}
                      placeholder="Foot Path"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={moveinStops}
                      label="Stops"
                      onChange={(e) => setMoveinStops(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 4 }}>
                      Elevator
                    </Typography>
                    <TextField
                      value={moveinElevatorType}
                      label="Elevator Type"
                      onChange={(e) => setmoveinElevatorType(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={moveinElevatorWeight}
                      label="weight"
                      onChange={(e) => setmoveinElevatorWeight(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/*Moving Dates */}

            <Divider sx={{ mt: 7 }} />
            <Typography variant="h6" sx={{ mt: 6 }}>
              Moving Dates
            </Typography>
            <Grid id={"2"} container spacing={8} sx={{ mt: 1 }}>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={movingDateType}
                      label="Moving Date Type"
                      onChange={(e) => setMovingDatetype(e.target.value)}
                      placeholder="Moving Data Type"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={fromDate}
                      label="From"
                      onChange={(e) => setFromDate(e.target.value)}
                      placeholder="From Date"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={toDate}
                      label="To"
                      onChange={(e) => setToDate(e.target.value)}
                      placeholder="To Date"
                    />
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  sx={{ mt: 10, width: 110, height: 50 }}
                  onClick={() => {
                    var datanew = {
                      c_id: "c1",
                      from_address: {
                        street_name: fromStreetName,
                        postcode: postcode,
                        city: city,
                      },
                      to_address: {
                        street_name: toStreetName,
                        postcode: moveinPostcode,
                        city: moveinCity,
                      },
                      from_details: {
                        living_type: moveoutLivingType,
                        no_stops: moveoutStops,
                        living_space: moveoutLivingSpace,
                        persons: person,
                        packboxes: moveoutpackboxes,
                        floor: moveoutFloor,
                        footpath: moveoutFootPath,
                        elevator: {
                          elevator_type: moveoutElevatorType,
                          weight: moveoutElevatorWeight,
                        },
                      },
                      to_details: {
                        living_type: moveinLivingType,
                        no_stops: moveinStops,
                        living_space: moveinLivingSpace,
                        floor: moveinFloor,
                        footpath: moveinFootPath,
                        elevator: {
                          elevator_type: moveinElevatorType,
                          weight: moveinElevatorWeight,
                        },
                      },
                      moving_dates: {
                        moving_date_type: movingDateType,
                        from: fromDate,
                        to: toDate,
                      },

                      client_details: {
                        Phone_no: Phone_no,
                        email: email,
                        full_name: fullname,
                      },
                    };

                    updatedata(datanew);
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <UsersInvoiceListTable
            productdata={productdata}
            plist={data.product_list}
            id={id}
          />
        );
      case 4:
        return (
          <MovingTable
            movingdata={movingservicesdata}
            plist={data.product_list}
            id={id}
          />
        );
      case 5:
        return (
          <MovingMaterial
            movingdata={movingdata}
            plist={data.product_list}
            id={id}
          />
        );
      case 6:
        return (
          <>
            <ProductPricing
              productdata={productdata}
              movingdata={movingdata}
              movingservicesdata={movingservicesdata}
              plist={data.product_list}
              id={id}
            />
          </>
        );

      default:
        return null;
    }
  };

  const renderContent = () => {
    return getStepContent(activeStep);
  };
  const Img = styled("img")(({ theme }) => ({
    width: 56,
    height: 56,
    //borderRadius: "50%",
    //marginRight: theme.spacing(3),
  }));
  return (
    <Box>
      <Card
        sx={{
          top: 70,
          position: "sticky",
          zIndex: "tooltip",
          mb: 7,
        }}
      >
        <CardContent>
          <StepperWrapper>
            <Stepper
              activeStep={activeStep}
              connector={<Icon icon="mdi:chevron-right" />}
            >
              {steps.map((step, index) => {
                return (
                  <Step
                    key={index}
                    onClick={() => handleClickScroll(index)}
                    sx={{}}
                  >
                    <StepLabel icon={<></>}>
                      <Img src={step.icon} alt={"icon"} />
                      <Typography className="step-title">
                        {step.title}
                      </Typography>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </StepperWrapper>
        </CardContent>

        <Divider sx={{ m: "0 !important", mt: 0 }} />
      </Card>
      <Card>
        <CardContent sx={{ mt: 0 }}>{renderContent()}</CardContent>
      </Card>
    </Box>
  );
};

export default CheckoutWizard;
