import React, { FC, ReactElement, useRef, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useTranslation } from "next-i18next";
import { useFormikContext } from "formik";
import { fileProcessorApiClient } from "@/lib/client/api";
import { useGetEmailSignature } from "@/lib/client/api/email/signature/queries";
import FieldLabel from "@/components/forms/fields/FieldLabel";
import { UserType } from "@/db/users";
import { useParams } from "next/navigation";
import { useGetLeadById } from "@/lib/client/api/leads/queries";
import SubmitButton from "@/components/forms/fields/SubmitButton";

interface EmailAIWrapperProps {
  user?: UserType;
}

const fields = [
  { label: "language", options: ["english", "serbian", "german", "french"] },
  { label: "manner", options: ["professional", "friendly", "casual"] },
  { label: "howYouKnowEachOther", options: ["weJustMetAt", "foundOn"] },
  {
    label: "goal",
    options: ["introduction", "offerColaboration", "checkOpportunities"],
  },
  {
    label: "additionalContext",
  },
];

const EmailAIWrapper: FC<EmailAIWrapperProps> = ({ user }): ReactElement => {
  const params = useParams() as { _id: string };
  const { data: lead } = useGetLeadById(params?._id);
  const { setFieldValue } = useFormikContext<{
    body: string;
    subtitle: string;
  }>();
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promptResult, setPromptResult] = useState({
    subject: "",
    body: "",
  });
  const mannerRef = useRef("professional");
  const languageRef = useRef("english");
  const sourceRef = useRef("weJustMetAt");
  const goalRef = useRef("introduction");
  const contextRef = useRef("");

  const { data: signature } = useGetEmailSignature();

  const handleDialog = () => setDialogOpen((prev) => !prev);

  const handleGenerateEmail = async () => {
    try {
      setLoading(true);
      const response = await fileProcessorApiClient.post(`/email`, {
        manner: mannerRef.current,
        lang: languageRef.current,
        goal: goalRef.current,
        context: contextRef.current,
        source: "Found him on Linkedin",
        user: JSON.stringify({
          firstName: lead?.firstName,
          lastName: lead?.lastName,
          role: lead?.role,
          company: lead?.company,
          industry: lead?.industry,
          country: lead?.country,
          website: lead?.website,
        }),
      });
      setPromptResult({
        body: response.data.data?.body,
        subject: response.data.data?.subject,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    const splitted = promptResult.body.split("\n");
    const parsed = splitted.reduce((prev, next) => {
      if (!next) {
        return `${prev}<p><br/></p>`;
      }
      return `${prev}<p>${next}</p>`;
    }, "");
    setFieldValue("body", `${parsed}<p><br/></p> ${signature?.body}`);
    setFieldValue("subject", promptResult.subject);
    handleDialog();
  };

  const refs: Record<string, React.MutableRefObject<string>> = {
    manner: mannerRef,
    language: languageRef,
    howYouKnowEachOther: sourceRef,
    goal: goalRef,
    additionalContext: contextRef,
  };

  return (
    <Box width={1} sx={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={handleDialog} endIcon={<AutoAwesomeIcon />}>
        {t("generateEmailWithAI")}
      </Button>
      {dialogOpen && (
        <Dialog
          open
          onClose={handleDialog}
          sx={{ root: { maxWIdth: "900px" } }}
          PaperProps={{ sx: { minWidth: "1000px !important" } }}
        >
          <Box width={1} sx={{ p: "30px" }}>
            <Grid container columnSpacing="20px" rowSpacing="16px">
              {fields.map((props) => (
                <Grid
                  key={props.label}
                  item
                  xs={12}
                  sm={props.label !== "additionalContext" ? 6 : 12}
                >
                  <FieldLabel label={props.label} />
                  <TextField
                    fullWidth
                    select={!!props.options}
                    defaultValue={refs[props.label].current}
                    onChange={(e) =>
                      (refs[props.label].current = e.target.value)
                    }
                  >
                    {!!props.options &&
                      props.options.map((item) => (
                        <MenuItem key={item} value={item}>
                          {t(item)}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
              ))}
            </Grid>
            {!!promptResult.body && (
              <>
                <Typography my="14px">{t("result")}</Typography>
                <Divider sx={{ my: "20px" }} />
                <FieldLabel label="subject" />
                <TextField
                  sx={{ mb: "14px" }}
                  fullWidth
                  value={promptResult.subject}
                />
                <FieldLabel label="body" />
                <TextField
                  fullWidth
                  value={promptResult.body}
                  multiline
                  rows={13}
                />
              </>
            )}
            <Box width={1} sx={{ display: "flex", columnGap: "24px" }}>
              <SubmitButton
                onClick={handleGenerateEmail}
                label={promptResult.body ? t("regenerate") : t("generate")}
                loading={loading}
              />
              <SubmitButton
                onClick={handleApply}
                label={t("apply")}
                loading={false}
                color="success"
                disabled={!promptResult.body}
              />
            </Box>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default EmailAIWrapper;
