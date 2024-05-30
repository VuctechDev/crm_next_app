"use client";
import React, { FC, ReactElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import TableWrapper from "../../components/table/TableWrapper";
import Card from "@mui/material/Card";

interface LeadsPageProps {}

const headers = [
  "Name",
  "Role",
  "Company",
  "Industry",
  "Employees",
  "Email",
  // "Phone",
  "Country",
  // "Post code",
  // "Address",
  "Website",
];

const LeadsPage: FC<LeadsPageProps> = (): ReactElement => {
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    const response = await fetch("/api/leads");
    const data = await response.json();
    console.log(data.data);
    setData(data.data);
  };

  const keys = [
    {
      key: "name",
    },
    {
      key: "role",
    },
    {
      key: "company",
    },
    {
      key: "industry",
    },
    {
      key: "employees",
    },
    {
      key: "email",
    },
    {
      key: "country",
    },
    {
      key: "website",
      render: (value: string) => (
        <a href={value} target="_blak">
          <ScreenSearchDesktopOutlinedIcon />
        </a>
      ),
    },
    // {
    //   key: "clientId",
    //   render: (value: string) => value ?? "--",
    // },
    // {
    //   key: "type",
    //   render: (value: string) => {
    //     if (value) {
    //       return t(value);
    //     }
    //     return "--";
    //   },
    // },
    // {
    //   key: "code",
    //   render: (value: string) => value ?? "--",
    // },
    // {
    //   key: "status",
    //   render: (value: number) => {
    //     let color:
    //       | "success"
    //       | "default"
    //       | "primary"
    //       | "secondary"
    //       | "error"
    //       | "info"
    //       | "warning" = "success";
    //     if (!value) {
    //       color = "error";
    //       return (
    //         <ReportRoundedIcon
    //           sx={{ mr: "16px" }}
    //           color={color}
    //           fontSize="medium"
    //         />
    //       );
    //     }
    //     return (
    //       <CheckCircleRoundedIcon
    //         sx={{ mr: "16px" }}
    //         color={color}
    //         fontSize="medium"
    //       />
    //     );
    //   },
    // },
    // {
    //   key: "created",
    //   // render: (value: string) => getDisplayDateTime(value),
    // },
    // {
    //   key: "_id",
    //   render: (value: string, data: any) => (
    //     <TooltipIconButton
    //       title="delete"
    //       color="secondary"
    //       onClick={() => {
    //         setConfirmationId(value);
    //       }}
    //     />
    //   ),
    //   preventClick: true,
    // },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box width={1}>
      <Box>
        Filter
      </Box>
      {/* <Card elevation={4} sx={{ p: "10px", height: "80vh" }}> */}
        <TableWrapper
          data={data}
          headers={headers}
          keys={keys}
          page={0}
          loading={false}
          pageRows={10}
          totalCount={100}
          handlePagination={() => null}
          handleRowSelect={() => null}
          hover={false}
        />
      {/* </Card> */}
    </Box>
  );
};

export default LeadsPage;
