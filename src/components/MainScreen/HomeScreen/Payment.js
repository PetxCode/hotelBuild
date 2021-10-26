import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useHistory } from "react-router-dom";

const PaystackHookExample = () => {
  const hist = useHistory();

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: 20000,
    publicKey: "pk_test_d632bf4b9aa1e74745eb158cec8034961dc13b18",
  };

  const onSuccess = (reference) => {
    hist.push("/");
    console.log(reference);
  };

  const onClose = () => {
    const say = "This Transition wasn't successful";
    console.log(say);
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

function Payment() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        paddingTop: "150px",
      }}
    >
      <PaystackHookExample />
    </div>
  );
}

export default Payment;
