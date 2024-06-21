"use client";
import React, {
  FC,
  ReactElement,
  useState,
  DragEvent,
  ChangeEvent,
} from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Hidden, Typography } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { useTranslation } from "next-i18next";
import { useSnackbar } from "../providers/SnackbarContext";
import { apiClient } from "@/lib/client/api";

interface FilePickerProps {
  type: "img" | "csv";
  error?: string;
}

const validExtensions = [".jpg", ".png"];

const config = {
  img: {
    path: "/cards",
    accept: ".jpg, .png, .jpeg",
    label: "JPG, JPEG or PNG",
    multiple: true,
  },
  csv: {
    path: "/csv",
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    label: "CSV or EXCEL",
    multiple: false,
  },
};

const FilePicker: FC<FilePickerProps> = ({ type, error }): ReactElement => {
  const { t } = useTranslation();
  const { openSnackbar } = useSnackbar();
  const [dragActive, setDragActive] = useState(false);
  const [myFile, setMyFile] = useState<File[]>([]);

  const { path, label, accept, multiple } = config[type];

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      myFile.forEach((file) => {
        formData.append("files", file);
      });
      const response = await apiClient.post(`/upload${path}`, formData);
      const data = response.data;
      if (!data.success) {
        return openSnackbar(data.message, "error");
      }
      setMyFile([]);
      return openSnackbar(data.message, "success");
    } catch (err) {
      console.log("ERROR: ", err);
      alert(JSON.stringify(err));
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      const valid = validExtensions.some((ext) =>
        e.dataTransfer.files[0].name.toLowerCase().endsWith(ext)
      );
      if (valid) {
        setMyFile(Array.from(e.dataTransfer.files));
      }
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setMyFile(Array.from(e.target.files));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={1}
      sx={{ alignItems: "center" }}
    >
      <Box
        width="350px"
        sx={(t) => ({
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          [t.breakpoints.down("sm")]: {
            width: "100%",
          },
        })}
      >
        <Box
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          width={1}
          sx={(t) => ({
            border: `2px dashed #4F4F4F`,
            borderRadius: "4px",
            textAlign: "center",
            py: "24px",
            display: "flex",
            flexDirection: "column",
            rowGap: "8px",
            alignItems: "center",
            justifyContent: "center",
            borderColor: dragActive
              ? "primary.main"
              : error
              ? t.palette.error.main
              : "",
            backgroundColor: dragActive
              ? "#00000033"
              : t.palette.background.paper,
            mb: error ? "4px" : "20px",
            transition: "background-color 0.3s",
          })}
        >
          <Box pt="10px">
            {!myFile.length ? (
              <UploadFileOutlinedIcon color="primary" />
            ) : (
              <DeleteSweepOutlinedIcon
                sx={{ cursor: "pointer" }}
                color="error"
                onClick={() => {
                  setMyFile([]);
                }}
              />
            )}
          </Box>
          {!myFile.length ? (
            <>
              <label htmlFor={`contained-button-file-${type}`}>
                <Typography
                  // variant="h5"
                  sx={(t) => ({
                    "& span": {
                      color: t.palette.primary.main,
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  })}
                >
                  <span>{t("clickToUpload")}</span> {t("orDragAndDrop")}
                </Typography>
                <input
                  accept={accept}
                  id={`contained-button-file-${type}`}
                  multiple={multiple}
                  type="file"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
              {}
            </>
          ) : (
            myFile.map((file) => (
              <Typography key={file?.name}>{file?.name}</Typography>
            ))
          )}
          {!myFile.length && (
            <Typography fontWeight={600} fontSize={14}>
              {label}
            </Typography>
          )}
          <Hidden mdUp>
            {!myFile.length && type === "img" && (
              <label htmlFor={`contained-button-file-${type}-camera`}>
                <Typography
                  // variant="h5"
                  sx={(t) => ({
                    mt: "12px",
                    "& span": {
                      color: t.palette.primary.main,
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  })}
                >
                  <span>{t("orTakeAPhoto")}</span>
                </Typography>
                <input
                  accept="image/*"
                  id={`contained-button-file-${type}-camera`}
                  type="file"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  capture="environment"
                />
              </label>
            )}
          </Hidden>
        </Box>
        <Box
          sx={{
            "& p": {
              fontWeight: 500,
              textAlign: "right",
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.2px",
              mr: "14px",
              mb: "20px",
            },
          }}
        >
          {error && <Typography color="error">{error}</Typography>}
        </Box>
        <Button
          disabled={!myFile.length}
          variant="contained"
          sx={{ mt: "10px" }}
          onClick={handleSubmit}
        >
          {t("save")}
        </Button>
      </Box>
      {type === "img" && (
        <Grid container columnSpacing={2} rowGap={3} mt="30px">
          {myFile.map((file) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={file.name}>
              <Box
                sx={(t) => ({
                  width: "100%",
                  height: "150px",
                  background: `url(${URL.createObjectURL(file)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "8px",
                  border: `1px solid ${t.palette.text.secondary}`,
                })}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FilePicker;
