"use client";

import React, { FC, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface QueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
});

const QueryProvider: FC<QueryProviderProps> = ({ children }): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
