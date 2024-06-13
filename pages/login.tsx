import React, { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLogin } from "@/lib/client/api/auth/actions";
import { useRouter } from "next/router";
import { Card, TextField, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { getSearchQuery } from "@/lib/client/getSearchQuery";

interface LoginProps {}

const Login: FC<LoginProps> = (): ReactElement => {
  const { mutateAsync, isSuccess } = useLogin();

  const email = getSearchQuery("email");

  const [values, setValues] = useState({
    email: email ?? "stefan@mail.io",
    password: email ? "" : "Aa123123@",
  });

  const { t } = useTranslation();
  const { push, locale } = useRouter();

  if (isSuccess) {
    push("/", "/", { locale });
  }

  const handleInput = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = async () => {
    try {
      await mutateAsync(values);
    } catch (error) {
      setValues({ email: "", password: "" });
    }
  };

  return (
    <Box
      width={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "98vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: "24px",
          maxWidth: "360px",
          p: "24px 24px 36px",
        }}
      >
        <Typography variant="h6">{t("sigin")}</Typography>
        <TextField
          label={t("email")}
          type="email"
          value={values.email}
          onChange={(e) => handleInput("email", e.target.value)}
        />
        <TextField
          label={t("password")}
          type="password"
          value={values.password}
          onChange={(e) => handleInput("password", e.target.value)}
        />
        <Button variant="contained" onClick={handleSignin}>
          {t("sigin")}
        </Button>
      </Card>
      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: "20px",
          // minHeight: "98vh",
        }}
      >
        <Typography sx={{ mr: "8px" }}>{t("noAccountYet")}</Typography>
        <Link href="/register">
          <Typography color="info.main">{t("register")}</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 60,
  };
}

export default Login;
