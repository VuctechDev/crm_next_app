import { useSnackbar } from "@/components/providers/SnackbarContext";
import { useTranslation } from "next-i18next";

const dynamicTags = ["name", "firstName", "lastName", "company"];

export const useDynamicTagsValidation = () => {
  const { openSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const validate = (value: string) => {
    const invalidTags = value
      .split("##")
      .filter((x: string, i: number) => i % 2 === 1)
      .filter((key: string) => !dynamicTags.includes(key));
    if (invalidTags.length) {
      openSnackbar(
        `${t("invalidDynamicKey")} ${invalidTags[0]} ${t(
          "notSupportedDynamicKey"
        )}`,
        "error"
      );
    }
    return !!invalidTags.length;
  };
  return validate;
};
