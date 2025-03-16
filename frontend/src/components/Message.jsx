const Message = ({ type, text }) => {
  return (
      <div className={`z-50 fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {text}
      </div>
  );
};

export default Message;
