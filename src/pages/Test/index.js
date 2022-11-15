import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { isEmpty } from "lodash";

const AzureTest = () => {
  const [list, setList] = useState([]);

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

  return (
    <>
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
    </>
  );
};

export default AzureTest;
