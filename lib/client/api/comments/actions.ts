import { apiClient } from "..";
import { CommentType } from "@/db/comments";

const path = "/comments";

export const getComments = async (
  parent: string,
  count: number
): Promise<{ data: CommentType[]; total: number }> => {
  const response = await apiClient.get(
    `${path}?count=${count}&parent=${parent}`
  );
  return response.data.data;
};

export const getCommentById = async (_id: string): Promise<CommentType> => {
  const response = await apiClient.get(`${path}/${_id}`);
  return response.data.data;
};

export const createComment = async (
  data: Partial<CommentType>
): Promise<any> => {
  const response = await apiClient.post(path, data);
  return response.data;
};

type UpdateCommentArgs = {
  _id: number;
  data: CommentType;
};

export const updateComment = async ({
  _id,
  data,
}: UpdateCommentArgs): Promise<any> => {
  const response = await apiClient.patch(`${path}?_id=${_id}`, data);
  return response.data;
};

export const deleteComment = async (_id: number) => {
  const response = await apiClient.delete(`${path}?_id=${_id}`);
  return response.data;
};

