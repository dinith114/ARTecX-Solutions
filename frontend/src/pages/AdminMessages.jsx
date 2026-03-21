import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
} from "../services/contactService";
import PageWrapper from "../components/common/PageWrapper";

function AdminMessages() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchMessages = async () => {
      try {
        const result = await getAllMessages();
        setMessages(result.data || []);
      } catch (error) {
        setErrorMessage(error.message || "Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const result = await updateMessageStatus(id, newStatus);

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === id ? { ...msg, status: result.data.status } : msg
        )
      );
    } catch (error) {
      setErrorMessage(error.message || "Failed to update status.");
    }
  };

  const openDeleteModal = (id) => {
    setSelectedMessageId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedMessageId(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (!selectedMessageId) return;

    try {
      await deleteMessage(selectedMessageId);

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== selectedMessageId)
      );

      closeDeleteModal();
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete message.");
      closeDeleteModal();
    }
  };

  const getStatusColor = (status) => {
    if (status === "New") {
      return "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800";
    }
    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
    }
    if (status === "Replied") {
      return "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
    }
    return "bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  };

  const filteredMessages = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return messages;

    return messages.filter((message) => {
      const name = message.fullName?.toLowerCase() || "";
      const email = message.email?.toLowerCase() || "";
      const content = message.message?.toLowerCase() || "";
      const status = message.status?.toLowerCase() || "";

      return (
        name.includes(term) ||
        email.includes(term) ||
        content.includes(term) ||
        status.includes(term)
      );
    });
  }, [messages, searchTerm]);

  return (
    <PageWrapper>
      <section className="w-full bg-[#f8fbff] py-16 transition-colors duration-300 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#1f3a93] dark:text-white">
                Admin Dashboard
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                View and manage submitted contact messages.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-red-500"
            >
              Logout
            </button>
          </div>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by name, email, message, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#2f80ed] focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          {loading ? (
            <p className="text-slate-700 dark:text-slate-300">
              Loading messages...
            </p>
          ) : errorMessage ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {errorMessage}
            </p>
          ) : filteredMessages.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              No matching messages found.
            </p>
          ) : (
            <div className="grid gap-6">
              {filteredMessages.map((message) => (
                <div
                  key={message._id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-[#1f3a93] dark:text-white">
                            {message.fullName}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {message.email}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                            message.status
                          )}`}
                        >
                          {message.status || "New"}
                        </span>
                      </div>

                      <p className="mb-4 leading-7 text-slate-700 dark:text-slate-300">
                        {message.message}
                      </p>

                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Submitted on{" "}
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:w-[230px] lg:flex-col">
                      <button
                        onClick={() => handleStatusChange(message._id, "New")}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition duration-300 hover:scale-[1.02] hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Mark New
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(message._id, "In Progress")
                        }
                        className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-blue-700 transition duration-300 hover:scale-[1.02] hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/30"
                      >
                        In Progress
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(message._id, "Replied")
                        }
                        className="rounded-lg border border-green-300 px-4 py-2 text-sm font-medium text-green-700 transition duration-300 hover:scale-[1.02] hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-950/30"
                      >
                        Replied
                      </button>

                      <button
                        onClick={() => openDeleteModal(message._id)}
                        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition duration-300 hover:scale-[1.02] hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/30"
                      >
                        Delete Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition duration-300 dark:bg-slate-900">
              <h3 className="text-2xl font-bold text-[#1f3a93] dark:text-white">
                Delete Message
              </h3>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                Are you sure you want to delete this message? This action cannot
                be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-700 transition duration-300 hover:scale-[1.02] hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition duration-300 hover:scale-[1.02] hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </PageWrapper>
  );
}

export default AdminMessages;