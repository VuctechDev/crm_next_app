"use client";
import React, { FC, ReactElement, useEffect } from "react";
import Box from "@mui/material/Box";
import { useGetUser } from "@/lib/client/api/user/queries";
import { useRouter } from "next/router";
import LoadingOverlayer from "@/components/LoadingOverlayer";

interface AuthGuardInnerProps {
  children: React.ReactNode;
}

const AuthGuardInner: FC<AuthGuardInnerProps> = ({
  children,
}): ReactElement => {
  const { data: user, isLoading } = useGetUser({ enabled: true });

  const { push, locale } = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      push("/login", "/login", { locale });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  if (user && !isLoading) {
    return <Box>{children}</Box>;
  }

  return <></>;
};

export default AuthGuardInner;
