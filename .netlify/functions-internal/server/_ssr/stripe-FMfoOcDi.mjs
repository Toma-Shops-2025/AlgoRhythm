import { l as loadStripe } from "../_libs/stripe__stripe-js.mjs";
const clientToken = "pk_live_51TbZFYAGzfh2ib0mkr1qXZUfk37oLthPPcvezCY1MvLWyUPCj6DTZgP0onzn1p1Hu6yvx3yMrtgpttxtHRb6Kz3a00tt3269pY";
const environment = clientToken?.startsWith("pk_test_") ? "sandbox" : "live";
let stripePromise = null;
function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(clientToken);
  }
  return stripePromise;
}
function getStripeEnvironment() {
  return environment;
}
export {
  getStripe as a,
  getStripeEnvironment as g
};
