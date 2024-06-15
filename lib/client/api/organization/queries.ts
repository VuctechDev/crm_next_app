import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOrganization,
  createOrganization,
  updateOrganization,
} from "./actions";
import { useSnackbar } from "@/components/providers/SnackbarContext";

export const useGetOrganization = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getOrganization,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useCreateOrganization = () => {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      openSnackbar("organizationDataSuccessUpdate");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useUpdateOrganization = () => {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      openSnackbar("organizationDataSuccessUpdate");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};
