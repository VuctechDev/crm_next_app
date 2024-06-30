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
        style={{ width: 1000, height: 420, overflow: "hidden" }}
        sx={(t) => ({
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
