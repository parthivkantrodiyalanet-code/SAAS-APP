

const Loading = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#1E1E28]">
      <div className="w-16 h-16 border-4 border-[#242436] border-t-[#5051F9] rounded-full animate-spin mb-4"></div>
      <p className="text-[#B0B0C4] text-lg font-medium">Loading Dashboard...</p>
    </div>
  );
};

export default Loading;
