import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import { isEmpty } from "lodash";
import useCurrency from "../../custom/useCurrency";
import {debounce} from 'lodash';

const AzureTest = () => {
  const [list, setList] = useState([]);
  const [currency, setCurrency] = useState("AUD");
  const currencyOptions = ["AUD", "USD", "INR", "AED"]

  const [exchangeRate] = useCurrency(currency);
  const { data, loading, error } = useQuery(exchangeRate);


  const handleChange = (e) => {
    setCurrency(e.target.value);
  }
  useEffect(() => {
    getAzureApi();
  }, []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const getAzureApi = () => {
    fetch(
      "https://catalogapi.azure.com/catalog/curationgrouplisting?api-version=2018-08-01-beta&group=Marketplace.FeaturedItems&presistOrder=true&returnedProperties=operatingSystem,id,freeTierEligible,legacyPlanId,iconFileUris,metadata.generation,vmSecuritytype,offer,publisherId,offerId&x-ms-effective-locale=en.en-us",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setList(result);
        // console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const renderCurrency = () => {
    if (loading) return <p>Loading...</p>;
    else if (error) return <p>{error}</p>;
    else
      return data.rates.map(({ currency, rate, name }) => (
        <div key={currency}>
          <p>
            {name}: {currency}: {rate}
          </p>
        </div>
      ));
  };

  return (
    <div>
      <h2>Azure Api Testing</h2>
      {console.log("list------------->", list)}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">OS Image</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="OS Image"
            name="osImage"
            placeholder="OS Image"
          >
            {!isEmpty(list) &&
              list.map((el) => (
                <MenuItem value={el?.displayName}>{el?.displayName}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      <br></br>
      <h3>GraphQL API Testing</h3>
      <select value={currency} onChange={handleChange} >
      {
        currencyOptions.map((item, index) => {
          return (
            <option key={index} value={item}>{item}</option>
          )
        })
      }
      </select>
      <br></br>

      {console.log("data---------", data)}

      {renderCurrency()}
    </div>
  );
};

export default AzureTest;
