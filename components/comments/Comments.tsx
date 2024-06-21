import React, { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  useCreateComment,
  useDeleteComment,
  useGetComments,
} from "@/lib/client/api/comments/queries";
import LoadingSkeleton from "./LoadingSkeleton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useGetUser } from "@/lib/client/api/user/queries";
import SubmitButton from "../forms/fields/SubmitButton";

interface CommentsProps {
  parentId: string;
}

const Comments: FC<CommentsProps> = ({ parentId }): ReactElement => {
  const { t } = useTranslation();

  const [count, setCount] = useState(5);
  const [comment, setComment] = useState("");
  const [deleteModalID, setDeleteModalID] = useState("");

  const { mutateAsync: createComment, isPending } = useCreateComment();
  const { data, isLoading } = useGetComments(parentId, count);
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { data: user } = useGetUser();

  const handleModal = (_id?: number) => setDeleteModalID(_id ? `${_id}` : "");

  const handleCreate = async () => {
    console.log("OPAA");
    try {
      await createComment({
        comment,
        parent: +parentId,
      });
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(+deleteModalID);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  let loadMore = (data?.total || data?.total === 0) && data?.total > count;

  let paginationLabel = `${data?.total} / ${data?.total}`;

  if (loadMore) {
    paginationLabel = `${count} / ${data?.total}`;
  }

  return (
    <Box width={1} sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "1000px",
          display: "flex",
          flexDirection: "column",
          p: "32px",
        }}
      >
        <Typography>{t("newComment")}</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={comment}
          sx={{ mt: "12px", mb: "28px" }}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box width={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <SubmitButton
            onClick={handleCreate}
            label={t("save")}
            disabled={!comment}
            loading={isPending}
            type="button"
            sx={{ mb: "32px", mt: "0px", maxWidth: "100px" }}
          />
        </Box>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data?.data?.map((comment) => (
            <Box key={comment._id} sx={{ mt: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="info.main">
                  {comment.createdBy.firstName} {comment.createdBy.lastName}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    {getDisplayDateTime(comment.createdAt)}
                  </Typography>
                  {user?._id === comment.createdBy._id && (
                    <IconButton
                      onClick={() => handleModal(comment._id)}
                      sx={(t) => ({
                        fontSize: t.typography.h5.fontSize,
                        ml: "6px",
                      })}
                    >
                      <DeleteOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Box sx={{ mt: "8px", pl: "12px" }}>
                <Typography>{comment.comment}</Typography>
              </Box>
              <Divider sx={{ width: "100%", my: "12px" }} />
            </Box>
          ))
        )}
        <Typography variant="body2" textAlign="center">
          {paginationLabel}
        </Typography>

        {loadMore && (
          <Box
            width={1}
            sx={{ display: "flex", justifyContent: "center", mt: "12px" }}
          >
            <Button onClick={() => setCount((prev) => prev + 5)}>
              {t("loadMore")}
            </Button>
          </Box>
        )}
      </Card>
      {!!deleteModalID && (
        <ConfirmationModal
          title="deleteComment"
          message="deleteLeadConfirmation"
          onCancel={() => handleModal()}
          onConfirm={handleDelete}
        />
      )}
    </Box>
  );
};

export default Comments;
