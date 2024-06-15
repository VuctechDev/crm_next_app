import React, { FC, ReactElement, useEffect } from "react";
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";
import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

interface PasswordStrengthProps {}

let validation = [
  { message: "oneLowercase", test: /[a-z]+/, valid: false },
  { message: "oneUppercase", test: /[A-Z]+/, valid: false },
  { message: "oneSpecialChar", test: /[^a-zA-Z0-9]+/, valid: false },
  { message: "oneNumber", test: /[0-9]+/, valid: false },
  { message: "min8Chra", test: /^.{8,}$/, valid: false },
];

const PasswordStrength: FC<PasswordStrengthProps> = (): ReactElement => {
  const { t } = useTranslation();
  const {
    values: { password },
  } = useFormikContext<any>();

  useEffect(() => {
    validation = validation.map((x) => ({
      ...x,
      valid: x.test.test(password),
    }));
  }, [password]);

  const errorMessage = validation.find((x) => !x.valid)?.message;
  const validTests = validation.filter((x) => !!x.valid).length;

  return (
    <Box>
      {errorMessage && (
        <Box
          width={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "12px",
          }}
        >
          <Typography
            variant="body2"
            color="error.light"
            width={1}
            textAlign="right"
          >
            {t(errorMessage ?? "")}
          </Typography>
        </Box>
      )}
      <Box
        sx={(t) => ({
          height: "10px",
          border: `1px solid ${t.palette.divider}`,
          borderRadius: "6px",
          mt: "12px",
          overflow: "hidden",
        })}
      >
        <Box
          sx={(t) => ({
            height: 1,
            backgroundColor: t.palette.success.light,
            width: `${20 * validTests}%`,
            transition: "width 0.3s",
          })}
        ></Box>
      </Box>
    </Box>
  );
};

export default PasswordStrength;
