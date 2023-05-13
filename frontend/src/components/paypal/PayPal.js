import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import REACT_APP_PAYPAL_CLIENT_ID from "../../../.env"

export default function PayPal() {
    console.log("REACT_APP_PAYPAL_CLIENT_ID")
    // console.log(REACT_APP_PAYPAL_CLIENT_ID)
    console.log("REACT_APP_PAYPAL_CLIENT_ID")
  return (
    // <PayPalScriptProvider options={{ "client-id": REACT_APP_PAYPAL_CLIENT_ID }}>
    <PayPalScriptProvider options={{ "client-id": "AXbqGsk-vmUOKxoG-NRPJFWmPx8JdaCTht3nw2_x4kgX2joJUA8wB8h8X3wXjyb9F93VRoZ4uMasHzkw" }}>
        <PayPalButtons style={{ layout: "horizontal" }} />
    </PayPalScriptProvider>
  );
}