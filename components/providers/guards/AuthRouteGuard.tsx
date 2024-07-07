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
  EMAIL: {
    ROOT: "/email",
    NEW: "/email/new",
    SIGNATURE: "/email/signature",
    CONFIG: "/email/config",
    TEMPLATES: "/email/templates",
  },
  USAGE: {
    ROOT: "/usage",
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
  const { data: user, isLoading, isFetched } = useGetUser();

  useEffect(() => {
    console.log(asPath, user, isLoading, isFetched);
    if (!isFetched) return;
    setChecking(true);

    const handleRedirect = (path: string) => {
      replace(path);
    };

    if (user) {
      if (!user.firstName && asPath !== ROUTES.ONBOARDING.USER) {
        handleRedirect(ROUTES.ONBOARDING.USER);
      } else if (
        !user.organization &&
        !!user.firstName &&
        asPath !== ROUTES.ONBOARDING.ORGANIZATION
      ) {
        handleRedirect(ROUTES.ONBOARDING.ORGANIZATION);
      } else if (
        asPath === ROUTES.ONBOARDING.ORGANIZATION &&
        !!user.organization
      ) {
        handleRedirect(ROUTES.LEADS.ROOT);
      } else if (publicPages.includes(path)) {
        handleRedirect(ROUTES.LEADS.ROOT);
      } else {
        setChecking(false);
      }
    } else {
      if (!publicPages.includes(path)) {
        handleRedirect(ROUTES.LOGIN);
      } else {
        setChecking(false);
      }
    }
  }, [asPath, user, isFetched]);

  if (checking || !isFetched) {
    return <LoadingOverlayer />;
  }

  return <>{children}</>;
};

export default RouteGuard;
