import { useQuery } from "@tanstack/react-query";
import { getUser } from "./actions";

export const useGetUser = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    enabled: enabled,
    
  });
};
