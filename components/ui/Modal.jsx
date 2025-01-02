
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="px-4 py-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
