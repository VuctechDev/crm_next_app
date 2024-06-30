import Box from "@mui/material/Box";

const LoadingOverlayer = () => {
  return (
    // <div
    //   style={{
    //     width: "100%",
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     height: "100vh",
    //     zIndex: "100000",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#fff",
    //   }}
    // >
    //   <div>
    //     <div className="loader"></div>
    //   </div>
    // </div>
    <Box
      sx={(t) => ({
        width: "100vw",
        height: "96vh",
        backgroundColor: t.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        positiom: "fixed",
        top: 0,
        left: 0,
      })}
    >
      <Box
        sx={(t) => ({
          transform: "rotateZ(45deg)",
          perspective: "200px",
          borderRadius: "50%",
          width: "58px",
          height: "58px",
          color: t.palette.mode === "dark" ? "#fff" : "#000",
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: "inherit",
            height: "inherit",
            borderRadius: "50%",
            transform: "rotateX(60deg)",
            animation: "1s spin linear infinite",
          },
          "&:after": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: "inherit",
            height: "inherit",
            borderRadius: "50%",
            // transform: "rotateX(70deg)",
            animation: "1s spin linear infinite",
            color: t.palette.primary.main,
            transform: "rotateY(60deg)",
            animationDelay: ".4s",
          },
        })}
      />
    </Box>
  );
};

export default LoadingOverlayer;
