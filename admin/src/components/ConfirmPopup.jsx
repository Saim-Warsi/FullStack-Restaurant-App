import React from "react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext.jsx";

const ConfirmPopup = ({ popupData, onConfirm }) => {
  const { showPopup, setShowPopup } = useContext(StoreContext);
  const handleConfirm = async (e) => {
    if (onConfirm) {
      await onConfirm(e);
      setShowPopup(false);
    }
  };
  const handleCancel = () => {
    setShowPopup(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm transition-all duration-300 ease-out">
      <div className="relative w-full max-w-md mx-auto">
        {/* Popup Container */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 ease-out scale-100">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  popupData.includes("delete") ||
                  popupData.includes("remove") ||
                  popupData.includes("cancel")
                    ? "bg-red-100"
                    : "bg-blue-100"
                }`}
              >
                {popupData.includes("delete") ||
                popupData.includes("remove") ||
                popupData.includes("cancel") ? (
                  <span className="material-symbols-outlined text-red-600 text-lg">
                    warning
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-blue-600 text-lg">
                    help
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {popupData.includes("delete") || popupData.includes("remove")
                  ? "Confirm Removal"
                  : popupData.includes("cancel")
                  ? "Confirm Cancellation"
                  : popupData.includes("add")
                  ? "Confirm Addition"
                  : "Confirm Action"}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <p className="text-gray-600 text-sm leading-relaxed">{popupData}</p>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className={`w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                  popupData.includes("delete") ||
                  popupData.includes("remove") ||
                  popupData.includes("cancel")
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    : popupData.includes("add")
                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                }`}
              >
                {popupData.includes("delete") || popupData.includes("remove")
                  ? "Remove"
                  : popupData.includes("cancel")
                  ? "Cancel Order"
                  : popupData.includes("add")
                  ? "Add Item"
                  : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
