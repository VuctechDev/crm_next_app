import React, { FC, ReactElement, useState } from "react";
import { Box, TextField, Card } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useSendEmail } from "@/lib/client/api/email/queries";
import EmailEditor from "./Editor";
import { useGetEmailSignature } from "@/lib/client/api/email/signature/queries";

interface NewEmailProps {
  to?: string;
  from?: string;
  recipient?: string;
}

const NewEmail: FC<NewEmailProps> = ({ to, from, recipient }): ReactElement => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useSendEmail();
  const { data: signature } = useGetEmailSignature();

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

  const initialValue = signature
    ? `<p><br/></p> <p><br/></p> ${signature.html}`
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
          InputProps={{ readOnly: !!to }}
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
