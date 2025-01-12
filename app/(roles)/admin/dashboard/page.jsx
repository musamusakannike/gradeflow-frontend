"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminService from "@/services/admin.service";
import ReactSwitch from "react-switch";
import Modal from "@/components/ui/Modal";

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    schoolId: "",
  });
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showTermModal, setShowTermModal] = useState(false);
  const [newSessionYear, setNewSessionYear] = useState("");
  const [newTermData, setNewTermData] = useState({
    name: "",
    sessionId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch statistics and sessions with terms in one call
        const stats = await adminService.getStatistics();
        setStatistics(stats);

        const fetchedSessions = await adminService.getSessionsWithTerms();
        setSessions(fetchedSessions);

        if (fetchedSessions.length > 0) {
          setCurrentSession(fetchedSessions[0]); // Select the latest session
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleScoring = async (termId, currentState) => {
    try {
      await adminService.toggleScoring(termId, !currentState);
      // Update the scoring state locally
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === currentSession._id
            ? {
                ...session,
                terms: session.terms.map((term) =>
                  term._id === termId
                    ? { ...term, isScoringEnabled: !currentState }
                    : term
                ),
              }
            : session
        )
      );
      toast.success(
        `Scoring ${!currentState ? "enabled" : "disabled"} successfully.`
      );
    } catch (err) {
      console.error("Failed to toggle scoring", err);
      toast.error("Failed to toggle scoring. Please try again.");
    }
  };

  const handleAddSession = async () => {
    if (!newSessionYear.trim()) {
      toast.error("Session year cannot be empty.");
      return;
    }

    try {
      const newSession = await adminService.addSession({
        year: newSessionYear,
      });
      setSessions((prev) => [newSession, ...prev]);
      setShowSessionModal(false);
      setNewSessionYear("");
      toast.success("Session added successfully!");
    } catch (err) {
      console.error("Failed to add session", err);
      toast.error("Failed to add session. Please try again.");
    }
  };

  const handleAddTerm = async () => {
    if (!newTermData.name.trim() || !newTermData.sessionId.trim()) {
      toast.error("Term name and session must be selected.");
      return;
    }

    try {
      const newTerm = await adminService.addTerm(newTermData);
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === newTermData.sessionId
            ? { ...session, terms: [...session.terms, newTerm] }
            : session
        )
      );
      setShowTermModal(false);
      setNewTermData({ name: "", sessionId: "" });
      toast.success("Term added successfully!");
    } catch (err) {
      console.error("Failed to add term", err);
      toast.error("Failed to add term. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      <p className="mt-4 text-gray-600">
        Welcome back! Here&apos;s an overview of your school&apos;s statistics:
      </p>
      {/* School ID Section */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
        <span className="text-gray-700 font-bold">School ID:</span>
        <span className="text-orange-500 font-semibold">
          {statistics.schoolId || "Loading..."}
        </span>
      </div>

      {loading ? (
        <p className="text-orange-500 mt-6">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {/* Statistics Cards */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-orange-500">
                {statistics.totalStudents}
              </h3>
              <p className="text-gray-600">Total Students</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-orange-500">
                {statistics.totalTeachers}
              </h3>
              <p className="text-gray-600">Total Teachers</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-orange-500">
                {statistics.totalClasses}
              </h3>
              <p className="text-gray-600">Total Classes</p>
            </div>
          </div>

          {/* Sessions Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Sessions</h3>
              <button
                onClick={() => setShowSessionModal(true)}
                className="cursor-pointer bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-orange-100 shadow"
              >
                + Add Session
              </button>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {sessions.map((session) => (
                <button
                  key={session._id}
                  onClick={() => setCurrentSession(session)}
                  className={`px-4 py-2 rounded-lg shadow ${
                    currentSession?._id === session._id
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {session.year}
                </button>
              ))}
            </div>
          </div>

          {/* Terms Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Terms</h3>
              <button
                onClick={() => setShowTermModal(true)}
                className="cursor-pointer bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-orange-100 shadow"
              >
                + Add Term
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {currentSession.terms.map((term) => (
                <div
                  key={term._id}
                  className="bg-white shadow-lg rounded-lg p-6 text-center"
                >
                  <h4 className="text-lg font-bold text-orange-500">
                    {term.name}
                  </h4>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-600">
                      {term.isScoringEnabled
                        ? "Scoring Enabled"
                        : "Scoring Disabled"}
                    </span>
                    <ReactSwitch
                      onChange={() =>
                        handleToggleScoring(term._id, term.isScoringEnabled)
                      }
                      checked={term.isScoringEnabled}
                      onColor="#f97316"
                      offColor="#d1d5db"
                      onHandleColor="#ffffff"
                      offHandleColor="#ffffff"
                      handleDiameter={22}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 2px 3px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Add Session Modal */}
      <Modal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        title="Add New Session"
      >
        <div>
          <label
            htmlFor="sessionYear"
            className="block text-gray-700 font-bold mb-2"
          >
            Session Year
          </label>
          <input
            id="sessionYear"
            type="text"
            value={newSessionYear}
            onChange={(e) => setNewSessionYear(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., 2024/2025"
          />
          <button
            onClick={handleAddSession}
            className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Session
          </button>
        </div>
      </Modal>

      {/* Add Term Modal */}
      <Modal
        isOpen={showTermModal}
        onClose={() => setShowTermModal(false)}
        title="Add New Term"
      >
        <div>
          <label
            htmlFor="termName"
            className="block text-gray-700 font-bold mb-2"
          >
            Term Name
          </label>
          <input
            id="termName"
            type="text"
            value={newTermData.name}
            onChange={(e) =>
              setNewTermData({ ...newTermData, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., 1st Term"
          />
          <label
            htmlFor="sessionDropdown"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Select Session
          </label>
          <select
            id="sessionDropdown"
            value={newTermData.sessionId}
            onChange={(e) =>
              setNewTermData({ ...newTermData, sessionId: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select a session</option>
            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.year}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddTerm}
            className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Term
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
