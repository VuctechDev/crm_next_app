"use client";
import React, {
  FC,
  ReactElement,
  useState,
  DragEvent,
  ChangeEvent,
  useRef,
} from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";

interface CSVFileUploadFieldProps {
  name: string;
  error?: string;
}

const validExtensions = [".jpg", ".png", ".docx"];

const CSVFileUploadField: FC<CSVFileUploadFieldProps> = ({
  name,
  error,
}): ReactElement => {
  const [dragActive, setDragActive] = useState(false);
  const [myFile, setMyFile] = useState<File | null>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleSubmit = async () => {
    // console.log("VALUES: ", values);
    try {
      const formData = new FormData();
      // formData.append("fullName", values.fullName);
      // formData.append("email", values.email);
      // formData.append("position", values.position);
      // formData.append("additionalInfo", values.additionalInfo);
      formData.append("file", myFile as Blob);
      // myFile?.forEach((file, index) => {
      //   formData.append(`file${index + 1}`, file, file.name);
      // });
      await fetch(`/api/upload/csv`, {
        method: "POST",
        body: formData,
        headers: {
          // "file-name": "ece.jpg",
          "file-name": myFile?.name ?? "",
        },
      });
      // setSent(true);
    } catch (err) {}
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const valid = validExtensions.some((ext) =>
        e.dataTransfer.files[0].name.toLowerCase().endsWith(ext)
      );
      if (valid) {
        setMyFile(e.dataTransfer.files[0]);
      }
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("FILES: ", e.target.files);
      setMyFile(e.target.files[0]);
    }
  };

  return (
    <Box display="flex">
      <Box width="400px" mr="100px">
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
            backgroundColor: dragActive ? "#00000033" : "#fff",
            mb: error ? "4px" : "20px",
            transition: "background-color 0.3s",
          })}
        >
          <Box pt="10px">
            {!myFile ? (
              <UploadFileOutlinedIcon color="primary" />
            ) : (
              <DeleteSweepOutlinedIcon
                sx={{ cursor: "pointer" }}
                color="error"
                onClick={() => {
                  setMyFile(null);
                }}
              />
            )}
          </Box>
          {!myFile ? (
            <label htmlFor="contained-button-file-csv">
              <Typography
                sx={(t) => ({
                  color: "#4F4F4F",
                  "& span": {
                    color: t.palette.primary.main,
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                })}
              >
                <span>Click to upload</span> or drag and drop
              </Typography>
              <input
                ref={inputRef}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                id="contained-button-file-csv"
                multiple
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
          ) : (
            <Typography color="#4F4F4F">{myFile?.name}</Typography>
          )}
          {!myFile && (
            <Typography
              fontWeight={600}
              fontSize={14}
              color="rgba(0, 0, 0, 0.60)"
            >
              PDF, or DOC
            </Typography>
          )}
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
        <Button variant="contained" sx={{ mt: "40px" }} onClick={handleSubmit}>
          SAVE
        </Button>
      </Box>
      {/* {!!myFile && (
        <img
          style={{ height: "230px", margin: "auto" }}
          src={URL.createObjectURL(myFile)}
        />
      )} */}
      {/* {myFile?.map((item) => (
        <img
          style={{ height: "230px", margin: "auto" }}
          src={URL.createObjectURL(item)}
        />
      ))} */}
    </Box>
  );
};

export default CSVFileUploadField;
