import React, { FC, ReactElement, useEffect, useState } from "react";
import { useGetUser } from "@/lib/client/api/user/queries";
import { useRouter } from "next/router";
import LoadingOverlayer from "@/components/LoadingOverlayer";

interface RouteGuardProps {
  children: React.ReactNode;
}

export const ROUTES = {
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
      NEW: "/leads/add/new",
    },
    EDIT: {
      ROOT: "/leads/edit",
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
    if (isLoading) {
      setChecking(true);
      return;
    }

    const handleRedirect = (path: string, delay: number = 500) => {
      replace(path);
      // setTimeout(() => {
      setChecking(false);
      // }, delay);
    };

    // console.log(user, isLoading, checking, path);

    if (user) {
      console.log(publicPages.includes(path));
      if (!user.firstName) {
        handleRedirect(ROUTES.ONBOARDING.USER);
      } else if (!user.organization) {
        handleRedirect(ROUTES.ONBOARDING.ORGANIZATION);
      } else if (publicPages.includes(path)) {
        handleRedirect(ROUTES.HOME);
      } else {
        setChecking(false);
      }
    } else {
      if (!isLoading && !publicPages.includes(path)) {
        handleRedirect(ROUTES.LOGIN);
      } else {
        setChecking(false);
      }
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
