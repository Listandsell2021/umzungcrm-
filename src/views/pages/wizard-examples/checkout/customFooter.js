import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
function CustomFooterTotalComponent(props) {
  return (
    <Box sx={{ padding: "10px", display: "flex", bgcolor: "#b9d5ff91" }}>
      <Typography
        noWrap
        component="h5"
        variant="h5"
        sx={{
          color: "black",
          textDecoration: "none",
          flexGrow: 1,
          textAlign: "right",
          mr: 60,
        }}
      >
        Total : {props.total} €
      </Typography>
    </Box>
  );
}

CustomFooterTotalComponent.propTypes = {
  total: PropTypes.number,
};

export { CustomFooterTotalComponent };
