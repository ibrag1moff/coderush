import { HashLoader } from "react-spinners";

export const CustomLoading = () => {
  return (
    <div className="fixed inset-0 z-99 bg-black flex items-center justify-center">
      <HashLoader color="#7f9cf5" />
    </div>
  );
};
