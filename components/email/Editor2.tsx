import React, { FC, ReactElement, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const CustomToolbar = () => (
  <div
    id="toolbar-container"
    style={{
      borderRadius: "12px",
      //   overflow: "hidden",
      border: "1px solid gray",
      display: "flex",
      columnGap: "16px",
      //   height: "200px",
    }}
  >
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-font"></select>
        <select className="ql-size"></select>
      </span>
      {/* <button className="ql-bold">B</button>
    <button className="ql-italic">I</button>
    <button className="ql-underline">U</button>
    <button className="ql-strike">S</button>
    <button className="ql-list" value="ordered">
      OL
    </button>
    <button className="ql-list" value="bullet">
      UL
    </button>
    <button className="ql-align" value="">
      Left
    </button>
    <button className="ql-align" value="center">
      Center
    </button>
    <button className="ql-align" value="right">
      Right
    </button>
    <button className="ql-link">Link</button>
    <button className="ql-image">Image</button> */}
    </div>
  </div>
);

const modules = {
  toolbar: {
    container: "#toolbar",
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
  "link",
  "image",
];

interface EmailEditorProps {}

const EmailEditor: FC<EmailEditorProps> = (): ReactElement => {
  const [content, setContent] = useState("");

  const onSubmit = () => null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(content);
    console.log(content);
  };

  const { quillRef } = useQuill({
    modules: {
      toolbar: "#toolbar",
    },
    formats: ["font", "size", "bold", "script"], // Important
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {/* <CustomToolbar />
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        style={{
          //   backgroundColor: "red",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid gray",
          height: "200px",
        }}
      /> */}
      {/* <Box ref={quillRef} sx={{ borderRadius: "20px", backgroundColor: "red", }} /> */}
      <div style={{ width: 500, height: 200 }}>
        <div id="toolbar">
          {/* <select className="ql-font" defaultValue="">
             </select> */}
          {/* <TextField
            select
            defaultValue="normal"
            // onChange={(e) => e.stopPropagation()}
            // InputProps={{ className: "ql-size" }}
            // SelectProps={{ className: "ql-size" }}

            inputProps={{
              class: "ql-size",
              style: { color: "red", display: "none" },
            }}
          >
            {["small", "normal", "large", "huge"].map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </TextField> */}
          {/* <Select
            inputProps={{
              class: "ql-size",
              style: { color: "red", display: "none" },
            }}
          >
            {["small", "normal", "large", "huge"].map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select> */}
          <select className="ql-font" defaultValue=""></select>
          <select className="ql-size" defaultValue="">
            <option value="small" />
            <option />
            <option value="large" />
            <option value="huge" />
          </select>
          <button className="ql-bold" />
          <button className="ql-script" value="sub" />
          <button className="ql-script" value="super" />
        </div>
        <div ref={quillRef} />
        <div id="editor" />
      </div>
      {/* <TextField
        variant="outlined"
        placeholder="Write something awesome..."
        fullWidth
        multiline
        minRows={3}
      /> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </Box>
        <Button
          //   type="submit"
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default EmailEditor;
