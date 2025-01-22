const SkeletonConfirmDialog = ({
  width = "100%",
  height = "1rem",
  className = "",
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default SkeletonConfirmDialog;
