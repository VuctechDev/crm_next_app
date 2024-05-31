"use client";
import React, { FC, ReactElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import TableWrapper from "../../../components/table/TableWrapper";

interface LeadsPageProps {}

const LeadsPage: FC<LeadsPageProps> = (): ReactElement => {
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    const response = await fetch("/api/leads");
    const data = await response.json();
    console.log(data.data);
    setData(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Box width={1} sx={{ my: "50px" }}>
        <Box
          width={1}
          sx={{ display: "flex", columnGap: "40px", width: "100%" }}
        >
          {[
            "Name",
            // "Role",
            "Company",
            "Industry",
            "Employees",
            "Contact",
            // "Phone",
            // "Country",
            // "Post code",
            "Address",
            "Website",
          ].map((item, i) => (
            <Box key={i} sx={{ width: item === "Website" ? "100px" : "200px" }}>
              <Box>
                <strong>{item}</strong>
              </Box>
            </Box>
          ))}
        </Box>

        {data.reverse().map((item, i) => (
          <Box
            key={i}
            sx={{
              my: "50px",
              display: "flex",
              columnGap: "40px",
              width: "100%",
              pb: "12px",
              borderBottom: "1px solid red",
            }}
          >
            <Box width="200px">
              {item.name} <br /> <br /> {item.role}
            </Box>
            {/* <Box width="250px"></Box> */}
            <Box width="200px">{item.company}</Box>
            <Box width="200px">{item.industry}</Box>
            <Box width="200px">{item.employees}</Box>
            <Box width="200px">
              {item.email} <br /> <br />
              {item.phone}
              <br /> <br />
              {item.mobile}
            </Box>
            {/* <Box width="250px"></Box>
        <Box width="250px"></Box> */}
            {/* <Box width="250px">{item.postCode}</Box> */}
            <Box width="200px">
              {item.address}, <br /> {item.postCode} {item.city}, <br />{" "}
              {item.country}
            </Box>
            <Box width="100px">
              <a href={item.website} target="_blak">
                <ScreenSearchDesktopOutlinedIcon />
              </a>
            </Box>
            {/* <hr style={{ width: "100%" }} /> */}
          </Box>
        ))}
      </Box>
      {/* <Button variant="contained" onClick={getData}>
    Prikazi
  </Button> */}
    </Box>
  );
};

export default LeadsPage;
