import React, { FC, ReactElement, useEffect } from "react";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useGetUser } from "@/lib/client/api/user/queries";
import { useRouter } from "next/router";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }): ReactElement => {
  const { data: user, isLoading, error, refetch  } = useGetUser({enabled: false});
  const { push, locale, asPath } = useRouter();
  console.log(asPath);
  useEffect(() => {
    // if (!user && !isLoading) {
    //   push("/login", "/login", { locale });
    // } else if (user && !isLoading) {
    //   push("/", "/", { locale });
    // }
    refetch()
  }, [isLoading]);

  // useEffect(() => {
  //   if (error) {
  //     push("/login", "/login", { locale });
  //   }
  // }, [error]);

  if (isLoading && asPath !== "/login") {
    return <LoadingOverlayer />;
  }

  // if (!isLoading && user) {
  //   return <LoadingOverlayer />;
  // }

  return <>{children}</>;
};

export default AuthGuard;
