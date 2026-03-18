import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
} from "../services/contactService";

function AdminMessages() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMessage(id);

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== id)
      );
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete message.");
    }
  };

  const getStatusColor = (status) => {
    if (status === "New") return "bg-yellow-100 text-yellow-700";
    if (status === "In Progress") return "bg-blue-100 text-blue-700";
    if (status === "Replied") return "bg-green-100 text-green-700";
    return "bg-slate-100 text-slate-700";
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
    <section className="w-full bg-[#f8fbff] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1f3a93]">Admin Messages</h2>
            <p className="mt-2 text-slate-600">
              View and manage submitted contact messages.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-500"
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
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#2f80ed] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {loading ? (
          <p className="text-slate-700">Loading messages...</p>
        ) : errorMessage ? (
          <p className="text-red-600">{errorMessage}</p>
        ) : filteredMessages.length === 0 ? (
          <p className="text-slate-700">No matching messages found.</p>
        ) : (
          <div className="grid gap-6">
            {filteredMessages.map((message) => (
              <div
                key={message._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1f3a93]">
                      {message.fullName}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{message.email}</p>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      message.status
                    )}`}
                  >
                    {message.status || "New"}
                  </span>
                </div>

                <p className="mb-4 leading-7 text-slate-700">{message.message}</p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleStatusChange(message._id, "New")}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Mark New
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(message._id, "In Progress")
                      }
                      className="rounded-lg border border-blue-300 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-50"
                    >
                      In Progress
                    </button>

                    <button
                      onClick={() => handleStatusChange(message._id, "Replied")}
                      className="rounded-lg border border-green-300 px-3 py-1.5 text-sm text-green-700 hover:bg-green-50"
                    >
                      Replied
                    </button>

                    <button
                      onClick={() => handleDelete(message._id)}
                      className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminMessages;