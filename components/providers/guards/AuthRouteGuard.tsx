import React, { FC, ReactElement, useEffect, useState } from "react";
import { useGetUser } from "@/lib/client/api/user/queries";
import { useRouter } from "next/router";
import LoadingOverlayer from "@/components/LoadingOverlayer";

interface RouteGuardProps {
  children: React.ReactNode;
}

const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_CONFIRMATION: "/register-confirmation",
  ONBOARDING: {
    USER: "/onboarding/user",
    ORGANIZATION: "/onboarding/organization",
  },
  LEADS: {
    ROOT: "/leads",
    ADD: {
      ROOT: "/leads/add",
      CARDS: "/leads/add/cards",
      CSV: "/leads/add/csv",
    },
  },
};

const publicPages = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.REGISTER_CONFIRMATION,
];

const RouteGuard: FC<RouteGuardProps> = ({ children }): ReactElement => {
  const { replace, asPath } = useRouter();

  const path = asPath.split("?")[0];

  const [checking, setChecking] = useState(true);
  const { data: user, isLoading } = useGetUser();

  useEffect(() => {
    if (!isLoading) {
      console.log(user, isLoading, checking, path);

      if (user) {
        console.log(publicPages.includes(path));
        if (!user.firstName) {
          replace(ROUTES.ONBOARDING.USER);
        }
        // else if (!user.organization) {
        //   // replace(ROUTES.ONBOARDING.ORGANIZATION);
        // }
        else if (publicPages.includes(path)) {
          replace("/", "/");
        } else {
          console.log("USER");
          setChecking(false);
        }
      } else {
        if (!isLoading && !publicPages.includes(path)) {
          replace(ROUTES.LOGIN);
        } else {
          console.log("!USER");

          setChecking(false);
        }
      }
    } else {
      setChecking(true);
    }
  }, [asPath, user, isLoading]);

  if (checking || isLoading) {
    return <LoadingOverlayer />;
  }

  if (!checking) {
    return <>{children}</>;
  }

  return <></>;
};

export default RouteGuard;
