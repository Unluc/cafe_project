import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import REACT_APP_PAYPAL_CLIENT_ID from "../../../.env"

export default function PayPal() {
    console.log("REACT_APP_PAYPAL_CLIENT_ID")
    console.log(REACT_APP_PAYPAL_CLIENT_ID)
    console.log("REACT_APP_PAYPAL_CLIENT_ID")
  return (
    <PayPalScriptProvider options={{ "client-id": REACT_APP_PAYPAL_CLIENT_ID }}>
        <PayPalButtons style={{ layout: "horizontal" }} />
    </PayPalScriptProvider>
  );
}