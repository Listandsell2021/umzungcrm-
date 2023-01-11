// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import SendOutline from "mdi-material-ui/SendOutline";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";

const PreviewActions = ({
  id,
  toggleSendInvoiceDrawer,
  toggleAddPaymentDrawer,
  download,
  sendemail,
}) => {
  return (
    <Card>
      <CardContent>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          variant="contained"
          startIcon={<SendOutline />}
          onClick={sendemail}
        >
          Send Estimate
        </Button>
        <Link href={`/apps/invoice/edit/${id}`} passHref>
          <Button
            fullWidth
            component="a"
            sx={{ mb: 3.5 }}
            color="secondary"
            variant="outlined"
          >
            Edit Estimate
          </Button>
        </Link>
        <Button
          fullWidth
          color="success"
          variant="contained"
          // startIcon={<CurrencyUsd />}
          onClick={download}
        >
          Download
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreviewActions;
