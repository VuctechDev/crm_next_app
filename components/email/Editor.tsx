import React, { FC, ReactElement, useEffect } from "react";
import { Box } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SubmitButton from "../forms/fields/SubmitButton";
import { useTranslation } from "next-i18next";

interface EmailEditorProps {
  loading: boolean;
  initialValue?: string;
  label?: string;
  handleSubmit: (body: string) => void;
}

const EmailEditor: FC<EmailEditorProps> = ({
  loading,
  initialValue,
  label,
  handleSubmit,
}): ReactElement => {
  const { t } = useTranslation();

  const { quill, quillRef } = useQuill();

  const onSubmit = () => {
    const body = quill?.root.innerHTML ?? "";
    handleSubmit(body);
  };

  useEffect(() => {
    if (initialValue) {
      quill?.clipboard.dangerouslyPasteHTML(initialValue);
    }
  }, [quill]);

  return (
    <Box>
      <Box
        sx={(t) => ({
          width: "1000px",
          height: "520px",
          "& > div": {
            border: "none !important",
          },
          "& > div:nth-child(1)": {
            borderBottom: "none !important",
            py: "14px",
            color: t.palette.text.primary,
          },
          "& > div:nth-child(2)": {
            border: "none !important",
            height: "calc(100% - 50px)",
          },
          [t.breakpoints.down("sm")]: {
            width: "100%",
            height: "360px",
            "& > div:nth-child(2)": {
              height: "calc(100% - 80px)",
            },
          },
        })}
      >
        <Box ref={quillRef} />
      </Box>
      <Box
        sx={{
          mt: "20px",
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
          onClick={onSubmit}
          label={label ? t(label) : t("send")}
          loading={loading}
          sx={{ maxWidth: "110px", mt: "0px" }}
        />
      </Box>
    </Box>
  );
};

export default EmailEditor;
