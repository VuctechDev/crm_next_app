import React, { FC, ReactElement, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Box, TextField, IconButton, Card } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SubmitButton from "../forms/fields/SubmitButton";
import { useTranslation } from "next-i18next";
import { useSendEmail } from "@/lib/client/api/email/queries";

interface EmailEditorProps {
  to?: string;
  from?: string;
  initialValue?: string;
  recipient?: string;
}

const EmailEditor: FC<EmailEditorProps> = ({
  to,
  from,
  initialValue,
  recipient,
}): ReactElement => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useSendEmail();

  const fromValue = useRef(from ?? "Stefan Vucic");
  const toValue = useRef(to ?? "vuctechdev@gmail.com");
  const subjectValue = useRef("");

  const { quill, quillRef } = useQuill();

  const handleSubmit = async () => {
    console.log(quill?.root.innerHTML, toValue.current, subjectValue.current);

    try {
      const html = quill?.root.innerHTML ?? "";
      await mutateAsync({
        html,
        from: fromValue.current,
        to: toValue.current,
        subject: subjectValue.current,
        recipient: recipient ?? "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (initialValue) {
      quill?.clipboard.dangerouslyPasteHTML(initialValue);
    }
  }, [quill]);

  return (
    <Card
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", pt: "16px" }}
    >
      <Box width={1} sx={{ px: "0px" }}>
        <TextField
          fullWidth
          defaultValue={fromValue.current}
          variant="standard"
          placeholder={t("from")}
          onChange={(e) => (fromValue.current = e.target.value)}
          sx={(t) => ({
            mb: "12px",
            "& div:before": { borderColor: t.palette.text.disabled },
            "& div": { pl: "12px", pb: "12px" },
          })}
        />
        <TextField
          fullWidth
          defaultValue={toValue.current}
          variant="standard"
          placeholder={t("to")}
          onChange={(e) => (toValue.current = e.target.value)}
          sx={(t) => ({
            mb: "12px",
            "& div:before": { borderColor: t.palette.text.disabled },
            "& div": { pl: "12px", pb: "12px" },
          })}
          InputProps={{ readOnly: !!to }}
        />
        <TextField
          fullWidth
          defaultValue={subjectValue.current}
          variant="standard"
          placeholder={t("subject")}
          onChange={(e) => (subjectValue.current = e.target.value)}
          sx={(t) => ({
            "& div:before": { borderColor: t.palette.text.disabled },
            "& div": { pl: "12px", pb: "12px" },
          })}
        />
      </Box>
      <Box
        style={{ width: 1000, height: 200 }}
        sx={(t) => ({
          "& > div": {
            border: "none !important",
          },
          "& > div:nth-child(1)": {
            borderBottom: "none !important",
            py: "14px",
            color: t.palette.text.primary,
            // "& button > svg > path": {
            //   stroke: `${t.palette.text.primary} !important`,
            // },
            // "& button > svg > line": {
            //   stroke: `${t.palette.text.primary} !important`,
            // },
            // "& span > svg > path": {
            //   stroke: `${t.palette.text.primary} !important`,
            // },
            // "& span > svg > line": {
            //   stroke: `${t.palette.text.primary} !important`,
            // },
            // "& span > svg > rect": {
            //   stroke: `${t.palette.text.primary} !important`,
            // },
          },
          "& > div:nth-child(2)": {
            border: "none !important",
          },
        })}
      >
        <Box ref={quillRef} />
      </Box>
      <Box
        sx={{
          mt: "80px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: "16px 24px",
        }}
      >
        {/* <IconButton>
          <AttachFileIcon />
        </IconButton> */}

        <SubmitButton
          onClick={handleSubmit}
          label={t("send")}
          loading={isPending}
          sx={{ maxWidth: "110px", mt: "0px" }}
        />
      </Box>
    </Card>
  );
};

export default EmailEditor;
