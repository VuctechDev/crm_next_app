import { useQuery } from "@tanstack/react-query";
import { getUsage } from "./actions";

export const useGetUsage = () => {
  return useQuery({
    queryKey: ["usage"],
    queryFn: getUsage,
  });
};
