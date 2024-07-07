import { apiClient } from "..";
import { SubscriptionType } from "@/db/subscriptions";

const path = "/subscriptions";

export const getSubscription = async (): Promise<{
  data: SubscriptionType;
}> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};
