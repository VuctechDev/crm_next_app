import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import Grid from "@mui/material/Grid";
import { Card, Typography } from "@mui/material";

interface StatsWrapperProps {
  data: { label: string; value: number }[];
}

const a = [
  { label: "Total emails sent", value: "123" },
  { label: "Total emails read", value: "72 / 58.5%" },
];

const StatsWrapper: FC<StatsWrapperProps> = ({ data }): ReactElement => {
  const { t } = useTranslation();
  return (
    <Grid container columnSpacing="40px" sx={{ mb: "50px" }}>
      {a.map((x) => (
        <Grid key={x.label} xs={3} item>
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: "36px 20px",
              rowGap: "28px",
            }}
          >
            <Typography variant="h5">{t(x.label)}</Typography>
            <Typography variant="h3" color="warning.main">
              {x.value}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsWrapper;
