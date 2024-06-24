import React, { FC, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { FieldInputProps } from "formik";
import { Box, Grid } from "@mui/material";

interface ColorPickerProps {
  elementProps: FieldInputProps<any>;
  error: string;
}

const ColorPicker: FC<ColorPickerProps> = ({
  elementProps,
  error,
}): ReactElement => {
  const { t } = useTranslation();

  const { value, onChange, name } = elementProps;
  return (
    <Grid container columnSpacing="18px" rowSpacing="14px">
      {[
        "#FF3333",
        "#FF5733",
        "#FF8C33",
        // "#FBC02D",
        "#2E7D32",
        "#4CAF50",
        "#00796B",
        "#3357FF",
        "#03A9F4",
        "#8C33FF",
        "#B833FF",
        "#FF33A1",
        "#8D6E63"
      ].map((x) => (
        <Grid xs={2} item key={x}>
          <Box
            sx={{
              backgroundColor: x,
              height: "30px",
              cursor: "pointer",
              borderRadius: "4px",
              border: x === value ? "2px solid #ccc" : "",
            }}
            onClick={() => onChange({ target: { value: x, name } })}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorPicker;
