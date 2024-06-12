const LoadingOverlayer = () => {
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: "100000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <div>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default LoadingOverlayer;
