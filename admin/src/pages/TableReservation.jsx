import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useState } from "react";
import axios from "axios";
import { Info, Trash2, Table2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmPopup from "../components/ConfirmPopup";

const TableReservation = () => {
  const { url } = useContext(StoreContext);
  const [tableName, setTableName] = useState("");
  const [tableCapacity, setTableCapacity] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showPopup, setShowPopup } = useContext(StoreContext);
  const [popupData, setPopupData] = useState("");
  const [tableIdToDelete, setTableIdToDelete] = useState(null);
  const [tableIdToUpdate, setTableIdToUpdate] = useState(null);
  const [popupAction, setPopupAction] = useState(null);

  const fetchAllTables = async () => {
    try {
      setLoading(true);
      const newUrl = url + "/api/table/list";
      const response = await axios.get(newUrl);
      if (response.data.success) {
        setTables(response.data.data);
      } else {
        toast.error("Could not fetch tables");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setTableIdToDelete(id);
    setPopupData("Are you sure you want to delete this table?");
    setPopupAction("delete");
    setShowPopup(true);
  };

  const handleTableAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newUrl = url + "/api/table/add";
      const response = await axios.post(newUrl, {
        name: tableName,
        capacity: tableCapacity,
      });
      if (response.data.success) {
        setTableCapacity(4);
        toast.success("Table added successfully");
        setTableName("");
        fetchAllTables();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while adding the table");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!tableIdToDelete) return;

    try {
      const newUrl = url + "/api/table/delete";
      const response = await axios.post(newUrl, { id: tableIdToDelete });
      if (response.data.success) {
        toast.success("Table deleted successfully");
        fetchAllTables();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while deleting the table");
    } finally {
      setTableIdToDelete(null);
    }
  };

  const handleUpdate = async () => {
    if (!tableIdToUpdate) return;

    try {
      const newUrl = url + "/api/table/updatestatus";
      const response = await axios.post(newUrl, { id: tableIdToUpdate });
      if (response.data.success) {
        toast.success("Table status updated successfully");
        fetchAllTables();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while updating the table");
    } finally {
      setTableIdToUpdate(null);
    }
  };

  const handleConfirm = () => {
    if (popupAction === "delete") {
      handleDelete();
    } else if (popupAction === "update") {
      handleUpdate();
    }
  };

  useEffect(() => {
    fetchAllTables();
  }, []);

  return (
    <div className="w-full  bg-gray-50">
      {showPopup && (
        <ConfirmPopup onConfirm={handleConfirm} popupData={popupData} />
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Table Management
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                Total Tables: <span className="font-bold">{tables.length}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto  h-[80vh] overflow-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Add Table Section */}
          <div className="bg-white rounded-xl  shadow-md border border-gray-200 overflow-hidden h-[50vh]">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 sm:px-8 py-4 sm:py-5 border-b border-yellow-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Add New Table
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleTableAdd} className="space-y-6">
                <div>
                  <label
                    htmlFor="tableName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Table Name
                  </label>
                  <input
                    id="tableName"
                    type="text"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-4 focus:ring-yellow-50 outline-none transition-all bg-white"
                    placeholder="e.g., Table-1, Table-2, VIP-A"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="tableCapacity"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Seating Capacity
                  </label>
                  <input
                    id="tableCapacity"
                    type="number"
                    min="1"
                    max="20"
                    value={tableCapacity}
                    onChange={(e) => setTableCapacity(e.target.value)}
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-4 focus:ring-yellow-50 outline-none transition-all bg-white"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Default capacity is set to 4 persons. Adjust as needed for
                    your table configuration.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-lg text-base font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:shadow-lg active:scale-95"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Adding Table...</span>
                    </>
                  ) : (
                    <span>Add Table</span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="bg-white rounded-xl  shadow-md border border-gray-200 h-[45vh] md:h-[50vh] overflow-auto">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 sm:px-8 py-4 sm:py-5 border-b border-yellow-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Existing Tables
              </h2>
            </div>

            <div className="p-6 sm:p-8 max-h-[600px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin h-12 w-12 border-4 border-yellow-500 border-t-transparent rounded-full mb-4"></div>
                  <p className="text-gray-500 font-medium">Loading tables...</p>
                </div>
              ) : tables.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <Table2 className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No tables yet
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add your first table to get started with reservations.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 ">
                  {tables.map((table, index) => (
                    <div
                      key={table._id || index}
                      className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl hover:shadow-lg hover:border-yellow-300 transition-all duration-200"
                    >
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <h3 className="font-bold text-gray-900 text-lg sm:text-xl break-words">
                                {table.name}
                              </h3>
                              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm flex-shrink-0">
                                {table.capacity} Seats
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteClick(table._id)}
                            className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 flex-shrink-0 text-red-600 hover:bg-red-600 hover:text-white border-2 border-red-200 hover:border-red-600 shadow-sm hover:shadow-md active:scale-95"
                            title="Remove table"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;
