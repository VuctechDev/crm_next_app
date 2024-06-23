import React, { FC, ReactElement, useEffect, useState } from "react";
import { Box, TextField, Card } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useSendEmail } from "@/lib/client/api/email/queries";
import EmailEditor from "./Editor";
import { useGetEmailSignature } from "@/lib/client/api/email/signature/queries";
import { useSnackbar } from "@/components/providers/SnackbarContext";

interface NewEmailProps {
  to?: string;
  from?: string;
  recipient?: string;
}

const NewEmail: FC<NewEmailProps> = ({ to, from, recipient }): ReactElement => {
  const { t } = useTranslation();
  const { openSnackbar } = useSnackbar();
  const { mutateAsync, isPending } = useSendEmail();
  const { data: emailSignature, isLoading } = useGetEmailSignature();

  const [fromValue, setFromValue] = useState(from ?? "");
  const [toValue, setToValue] = useState(to ?? "");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (html: string) => {
    try {
      await mutateAsync({
        html,
        from: fromValue,
        to: toValue,
        subject,
        recipient: recipient ?? "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!emailSignature && !isLoading) {
      openSnackbar(
        `${t("noEmailConfigurationWarning")} ${
          process.env.NEXT_PUBLIC_EMAIL_USER
        }`,
        "warning"
      );
    }
  }, [isLoading, emailSignature]);

  const initialValue = emailSignature
    ? `<p><br/></p> <p><br/></p> ${emailSignature.html}`
    : "";

  return (
    <Card sx={{ display: "flex", flexDirection: "column", pt: "16px" }}>
      <Box width={1} sx={{ px: "0px" }}>
        <TextField
          fullWidth
          value={fromValue}
          variant="standard"
          placeholder={t("from")}
          onChange={(e) => setFromValue(e.target.value)}
          sx={(t) => ({
            mb: "12px",
            "& div:before": { borderColor: t.palette.text.disabled },
            "& div": { pl: "12px", pb: "12px" },
          })}
          inputProps={{ readOnly: true, sx: { cursor: "not-allowed" } }}
        />
        <TextField
          fullWidth
          value={toValue}
          variant="standard"
          placeholder={t("to")}
          onChange={(e) => setToValue(e.target.value)}
          sx={(t) => ({
            mb: "12px",
            "& div:before": { borderColor: t.palette.text.disabled },
            "& div": { pl: "12px", pb: "12px" },
          })}
          inputProps={{
            readOnly: !!to,
            sx: { cursor: !to ? "unset" : "not-allowed" },
          }}
        />
        <TextField
          fullWidth
          value={subject}
          variant="standard"
          placeholder={t("subject")}
          onChange={(e) => setSubject(e.target.value)}
          sx={(t) => ({
            "& div:before": { borderColor: t.palette.text.disabled },
            "& div": { pl: "12px", pb: "12px" },
          })}
        />
      </Box>
      <EmailEditor
        handleSubmit={handleSubmit}
        loading={isPending}
        initialValue={initialValue}
      />
    </Card>
  );
};

export default NewEmail;
