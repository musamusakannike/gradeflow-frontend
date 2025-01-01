import {SquareLoader} from "react-spinners"

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 w-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
    </div>
  );
};

export default Loading;
