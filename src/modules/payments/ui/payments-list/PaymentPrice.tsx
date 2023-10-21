import { usePrice } from "@/modules/purchases/hooks/usePriceConverter";
import React from "react";

type PaymentPriceProps = {
  price: number;
};

export const PaymentPrice: React.FC<PaymentPriceProps> = ({ price }) => {
  const { code } = usePrice(price);

  const formattedPrice = Math.round(price).toLocaleString("en-US", {
    style: "decimal",
  });

  return (
    <div className="payment-price">
      <span className="payment-price__value">{formattedPrice} </span>
      <span className="payment-price__symbol">{code}</span>
    </div>
  );
};
