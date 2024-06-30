import React, { FC, ReactElement, useEffect, useState } from "react";
import { Box, Button, Dialog, Typography, useTheme } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import { FieldInputProps, useFormikContext } from "formik";
import { useTranslation } from "next-i18next";

interface EmailBodyFieldProps {
  elementProps: FieldInputProps<any>;
  error: string;
}

const EmailBodyField: FC<EmailBodyFieldProps> = ({
  elementProps,
  error,
}): ReactElement => {
  const { t } = useTranslation();
  const { values } = useFormikContext<{
    template: string;
    body: string;
  }>();
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [instructionsModalOpen, setInstructionsModalOpen] = useState(false);
  const { quill, quillRef } = useQuill();
  const { value, onChange, name, onBlur } = elementProps;

  useEffect(() => {
    if (value) {
      quill?.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill, values["template"]]);

  const handleInstructionsModal = () =>
    setInstructionsModalOpen((prev) => !prev);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const body = quill?.root.innerHTML ?? "";
        onChange({
          target: { value: body === "<p><br></p>" ? "" : body, name },
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
    <Box width={1}>
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
            border: `1.111px solid ${getBorderColor()} !important`,
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
      <Box
        sx={{
          mt: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography>{t("learnAboutDynamicKeys")}</Typography>
        <Button
          onClick={handleInstructionsModal}
          variant="text"
          sx={{
            p: "2px",
            ml: "6px",
            mt: "2px",
            height: "26px !important",
            minHeight: "26px !important",
            fontSize: "13px",
            "& > span": {
              height: "26px !important",
            },
          }}
        >
          {t("learnMore")}
        </Button>
      </Box>
      {instructionsModalOpen && (
        <Dialog open onClose={handleInstructionsModal}>
          <Box sx={{ p: "30px" }}>
            <Typography variant="h4" my="12px">
              Enhance Your Email Campaigns with Dynamic Email Body
            </Typography>
            <Typography>
              Sending emails to multiple leads just got easier and more
              efficient with the dynamic email body feature. This innovative
              tool allows you to automate the personalization of each email,
              eliminating the need for manual customization.
            </Typography>
            <Typography variant="h5" mt="22px" mb="12px">
              How it works
            </Typography>
            <Typography>
              Using dynamic tags, you can insert personalized information
              directly into your email template. This ensures each recipient
              receives a tailored message that resonates with them.
            </Typography>
            <Typography variant="h6" mt="22px" mb="12px">
              Adding Dynamic Tags
            </Typography>
            <Typography>
              To add a dynamic tag, simply wrap the desired value in double
              hash, like so: <strong>##tag##</strong>. The system will
              automatically replace these tags with the corresponding
              information from your lead database.
            </Typography>
            <Typography variant="h6" mt="22px" mb="8px">
              Available Dynamic Tags
            </Typography>
            <Typography mb="4px">
              <strong style={{ display: "inline" }}>##firstName##</strong>:
              Inserts the recipient&apos;s first name (e.g., John).
            </Typography>
            <Typography mb="4px">
              <strong style={{ display: "inline" }}>##lastName##</strong>:
              Inserts the recipient&apos;s last name (e.g., Doe).
            </Typography>
            <Typography mb="4px">
              <strong style={{ display: "inline" }}>##name##</strong>: Inserts
              the recipient&apos;s full name (e.g., John Doe).
            </Typography>
            <Typography mb="4px">
              <strong style={{ display: "inline" }}>##company##</strong>:
              Inserts the recipient&apos;s company name.
            </Typography>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default EmailBodyField;
