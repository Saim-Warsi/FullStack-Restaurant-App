import React, { useState, useEffect } from "react";
import { Search, Mail, Send, Users, X, Check } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Subscribers = ({ url }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/subscription/list`);
      if (response.data.success) {
        setSubscribers(response.data.data);
      } else {
        toast.error("Failed to fetch subscribers");
      }
    } catch (error) {
      toast.error("Error connecting to server");
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

 const handleSendPromotion = async () => {
    if (!emailSubject.trim() || !emailBody.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }

    if (subscribers.length === 0) {
      toast.error("No subscribers to send emails to");
      return;
    }

    setSending(true);

    try {
      const response = await axios.post(`${url}/api/subscription/send-promotion`, {
        subject: emailSubject,
        message: emailBody
      }, {
        timeout: 120000
      });

      if (response.data.success === true || response.status === 200) {
        toast.success(response.data.message || "Promotional emails sent successfully!");
        setSent(true);
        setTimeout(() => {
          setShowEmailModal(false);
          setSent(false);
          setEmailSubject("");
          setEmailBody("");
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to send emails");
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. The emails might still be sending.");
      } else if (error.response) {
        toast.error(error.response.data?.message || "Server error occurred");
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("Error sending promotional emails");
      }
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="w-[85%] md:w-full bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Subscribers
            </h1>
            
          </div>
        </div>

        {/* Spinner */}
        <div className="flex items-center justify-center mt-20">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[85%] md:w-full bg-gray-50">
      {/* Custom Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          border-radius: 10px;
          border: 1px solid #f59e0b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #f59e0b, #d97706);
        }
      `}</style>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className=" bg-yellow-400 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <Mail className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Send Promotion</h2>
                  <p className="text-sm text-yellow-50">To all {subscribers.length} subscribers</p>
                </div>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-white hover:bg-white hover:text-black hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[calc(90vh-200px)] overflow-y-auto custom-scrollbar">
              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="e.g., Special 30% OFF on All Orders Today!"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100 transition-all"
                />
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Message
                </label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Write your promotional message here..."
                  rows={10}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100 transition-all resize-none"
                />
              </div>

              {/* Preview Info */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> This email will be sent to all {subscribers.length} subscribers.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t">
              <button
                onClick={() => setShowEmailModal(false)}
                disabled={sending}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendPromotion}
                disabled={sending || sent}
                className={`px-6 py-2.5 font-semibold rounded-lg transition-all flex items-center gap-2 ${
                  sent
                    ? "bg-green-500 text-white"
                    : sending
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-400 text-white hover:shadow-lg"
                }`}
              >
                {sent ? (
                  <>
                    <Check className="h-5 w-5" />
                    Sent Successfully!
                  </>
                ) : sending ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send to All
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

     {/* Header */}
<div className="bg-white shadow-sm border-b sticky top-0 z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
    <div className="flex items-center justify-between">
      {/* Title Section */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
        Subscribers
      </h1>
      
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <span className="bg-yellow-400 text-white p-2 rounded-full font-semibold">
            <Users className="h-4 w-4 inline-block mr-1" />
            Total: <span className="font-bold">{subscribers.length}</span>
          </span>
        </div>
        
        {/* Send Promotion Button */}
        <button
          onClick={() => setShowEmailModal(true)}
          disabled={subscribers.length === 0}
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Send Promotion</span>
          <span className="sm:hidden">Send</span>
        </button>
      </div>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-[70vh] overflow-auto custom-scrollbar">
            <div className="p-4 sm:p-6">
              {subscribers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No subscribers yet
                  </h3>
                  <p className="text-gray-500">
                    Subscribers will appear here once they sign up
                  </p>
                </div>
              ) : (
                <>
                  {/* Search Bar */}
                  <div className="mb-6">
                    <div className="relative max-w-2xl">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        className="w-72 py-2 pl-12 pr-12 rounded-xl bg-white focus:outline-none transition-all duration-300 placeholder:text-black text-gray-700 font-light"
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by email..."
                      />
                    </div>
                    {search && (
                      <p className="mt-2 text-sm text-gray-600">
                        Found{" "}
                        <span className="font-semibold text-yellow-600">
                          {filteredSubscribers.length}
                        </span>{" "}
                        subscribers matching "{search}"
                      </p>
                    )}
                  </div>

                  {/* Table Header - Desktop */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-lg mb-4 font-semibold text-gray-700 text-sm">
                    <div className="col-span-1">#</div>
                    <div className="col-span-7">Email</div>
                    <div className="col-span-4">Subscribed Date</div>
                  </div>

                  {/* Subscribers List */}
                  {filteredSubscribers.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No subscribers found
                      </h3>
                      <p className="text-gray-500">
                        Try a different search term
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredSubscribers.map((subscriber, index) => (
                        <div
                          key={subscriber._id}
                          className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden"
                        >
                          {/* Mobile Layout */}
                          <div className="md:hidden p-4">
                            <div className="flex items-start gap-3">
                              <div className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 break-all mb-1">
                                  {subscriber.email}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Joined {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Layout */}
                          <div className="hidden md:block">
                            <div className="px-4 py-3">
                              <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-1">
                                  <div className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                  </div>
                                </div>
                                <div className="col-span-7">
                                  <p className="font-medium text-gray-900 break-all">
                                    {subscriber.email}
                                  </p>
                                </div>
                                <div className="col-span-4">
                                  <p className="text-sm text-gray-600">
                                    {new Date(subscriber.subscribedAt).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribers;