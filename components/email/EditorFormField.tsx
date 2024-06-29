import React, { FC, ReactElement, useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import { FieldInputProps } from "formik";

interface EmailEditorProps {
  elementProps: FieldInputProps<any>;
  error: string;
}

const EmailEditor: FC<EmailEditorProps> = ({
  elementProps,
  error,
}): ReactElement => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const { quill, quillRef } = useQuill();
  const { value, onChange, name, onBlur } = elementProps;

  useEffect(() => {
    if (value) {
      quill?.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log("Text change!: ", quill?.root.innerHTML ?? "");
        const html = quill?.root.innerHTML ?? "";
        onChange({
          target: { value: html === "<p><br></p>" ? "" : html, name },
        });
      });
      quill.on("selection-change", (e) => {
        setFocused(!!e);
        if (!e) {
          onBlur({ target: { value: "", name, persist: {} } });
        }
      });
    }
  }, [quill]);

  const getBorderColor = (hover?: boolean) => {
    if (error) {
      return theme.palette.error.main;
    } else if (focused) {
      return theme.palette.primary.main;
    } else if (hover) {
      return theme.palette.text.primary;
    }
    return theme.palette.divider;
  };

  return (
    <Box
      style={{ width: "100%", minHeight: "220px", overflow: "hidden" }}
      sx={(t) => ({
        "&:hover": {
          "& > div:nth-child(2)": {
            borderColor: `${getBorderColor(true)}  !important`,
          },
        },
        "& > div": {
          border: "none !important",
        },
        "& > div:nth-child(1)": {
          borderBottom: "none !important",
          py: "14px",
          color: t.palette.text.primary,
        },
        "& > div:nth-child(2)": {
          borderRadius: "8px",
          border: `1.111px solid ${getBorderColor()}  !important`,
          height: "250px",
          transition: "border-color 0.1s",
        },
      })}
    >
      <Box ref={quillRef} />
      {error && (
        <Typography
          color="error"
          textAlign="right"
          variant="body2"
          pr="14px"
          mt="3px"
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default EmailEditor;
