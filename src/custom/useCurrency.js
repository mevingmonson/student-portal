import { gql } from "@apollo/client";

const useCurrency = (currencyMode = "AUD") => {
  const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "${currencyMode}") {
      currency
      rate
      name
    }
  }
`;

  return [EXCHANGE_RATES];
};

export default useCurrency;