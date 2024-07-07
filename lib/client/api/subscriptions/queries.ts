import { useQuery } from "@tanstack/react-query";
import { getSubscription } from "./actions";

export const useGetSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscription,
  });
};
