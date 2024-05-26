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

interface FilesUploadFieldProps {
  name: string;
  error?: string;
}

const validExtensions = [".jpg", ".png", ".docx"];

const FilesUploadField: FC<FilesUploadFieldProps> = ({
  name,
  error,
}): ReactElement => {
  const [dragActive, setDragActive] = useState(false);
  const [myFile, setMyFile] = useState<File[]>([]);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleSubmit = async () => {
    // console.log("VALUES: ", values);
    try {
      const formData = new FormData();
      // formData.append("fullName", values.fullName);
      // formData.append("email", values.email);
      // formData.append("position", values.position);
      // formData.append("additionalInfo", values.additionalInfo);
      // formData.append("file", myFile as Blob);
      myFile.forEach((file) => {
        formData.append("files", file);
      });
      await fetch(`/api/upload/multiple`, {
        method: "POST",
        body: formData,
        headers: {
          // "file-name": "ece.jpg",
          // "file-name": myFile?.name ?? "",
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
        setMyFile(Array.from(e.dataTransfer.files));
      }
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("FILES: ", e.target.files);
      setMyFile(Array.from(e.target.files));
    }
  };

  return (
    <Box display="flex" flexDirection="column">
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
            <label htmlFor="contained-button-file">
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
                accept=".pdf,.jpg,.png"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
          ) : (
            myFile.map((file) => (
              <Typography key={file?.name} color="#4F4F4F">
                {file?.name}
              </Typography>
            ))
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
      <br />
      <br />
      <Box>
        {myFile?.map((file) => (
          <img
            key={file.name}
            style={{ height: "230px", margin: "auto" }}
            src={URL.createObjectURL(file)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FilesUploadField;
