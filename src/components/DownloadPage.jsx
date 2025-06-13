import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/download.css";
import DownloadPresenter from "../presenters/downloadPresenter";

const DownloadPage = () => {
  const presenter = new DownloadPresenter();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataType, setDataType] = useState("carbon");
  const [password, setPassword] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    if (!startDate || !endDate) {
      alert("Please select start and end dates.");
      return;
    }
    setShowPasswordPrompt(true);
  };

  const confirmDownload = async () => {
    if (!presenter.validatePassword(password)) {
      alert("Incorrect password.");
      return;
    }

    setIsLoading(true);
    setDownloadProgress("Downloading...");

    try {
      await presenter.downloadData({
        startDate,
        endDate,
        dataType,
        onSuccess: (fileBlob, filename) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(fileBlob);
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          link.remove();
          setDownloadProgress("Success: File downloaded.");
          setShowPasswordPrompt(false);
          setPassword("");
        },
        onError: () => {
          setDownloadProgress("Failed to download data.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      setDownloadProgress("Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f1f9f1] custom-bg">
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-md dashboardpage-sidebar">
        <div className="sidebar-logo-wrapper">
          <img src="/assets/Logo.png" alt="Logo" className="sidebar-logo" />
        </div>
        <h2 className="sidebar-title">Eddy Station</h2>
        <nav className="flex-1">
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link sidebar-active" : "sidebar-link"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/download" className={({ isActive }) => isActive ? "sidebar-link sidebar-active" : "sidebar-link"}>
                Download Data
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="sidebar-bottom">
          <NavLink to="/" className="sidebar-link">
            Back to Home
          </NavLink>
        </div>
      </aside>

      {/* Navbar Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-2 md:hidden z-50">
        <NavLink to="/" className="flex flex-col items-center text-sm">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-4H9v4a1 1 0 01-1 1H3a1 1 0 01-1-1V9.75z" />
          </svg>
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink to="/dashboard" className="flex flex-col items-center text-sm">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          <span className="text-xs">Dashboard</span>
        </NavLink>
        <NavLink to="/download" className="flex flex-col items-center text-sm">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3m-6-5V4h6v4" />
          </svg>
          <span className="text-xs">Download</span>
        </NavLink>
      </nav>

      <main className="flex-1 min-h-screen p-4 flex flex-col items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold text-center mb-6 custom-heading">
            Download Data
          </h1>
        </div>
        <div className="w-full max-w-md p-10 rounded-2xl shadow-md bg-green-50 custom-card">
          <h2 className="text-xl text-center font-semibold text-green-800 mb-8">
            {dataType === "carbon" ? "Carbon Data Download" : "Cuaca Data Download"}
          </h2>

          <div className="flex justify-center gap-8 mb-8">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="carbon"
                checked={dataType === "carbon"}
                onChange={() => setDataType("carbon")}
              />
              <span>Carbon</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="cuaca"
                checked={dataType === "cuaca"}
                onChange={() => setDataType("cuaca")}
              />
              <span>Cuaca</span>
            </label>
          </div>

          <div className="mb-8 custom-startend">
            <label className="block mb-2 font-medium">Start Date:</label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 input-startend"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="mb-8 custom-startend">
            <label className="block mb-2 font-medium">End Date:</label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 input-startend"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-4 rounded-full font-semibold bg-green-600 text-white hover:bg-green-700 transition button-getdata z-50 relative"
          >
            Get Data
          </button>

          {showPasswordPrompt && (
            <div className="mt-4">
              <label className="block mb-1 font-medium pw">Enter Password:</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-full p-2 mb-2 rounded-lg custom-input pr-10 input-startend"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                >
                  {passwordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.957 9.957 0 012.442-4.033M6.423 6.423A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.957 9.957 0 01-4.112 5.223M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
              <button
                onClick={confirmDownload}
                className="w-full py-2 px-4 rounded-full font-semibold custom-button-confirm"
              >
                Confirm Download
              </button>
            </div>
          )}

          <div className="mt-10 text-center font-medium text-green-800">
            <p>Download Progress</p>
            <p>{downloadProgress}</p>
          </div>
          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="loader" />
            </div>
          )}
        </div>
      </main>
      <nav className="bottom-navbar">
        <NavLink to="/" className="nav-icon" title="Home">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-4H9v4a1 1 0 01-1 1H3a1 1 0 01-1-1V9.75z" />
          </svg>
        </NavLink>
        <NavLink to="/dashboard" className="nav-icon" title="Dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3h10M11 7h7M11 11h4M4 3h2v2H4V3zm0 4h2v2H4V7zm0 4h2v2H4v-2zm0 4h2v2H4v-2z" />
          </svg>
        </NavLink>
        <NavLink to="/download" className="nav-icon" title="Download">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11" />
          </svg>
        </NavLink>
      </nav>
    </div>
  );
};

export default DownloadPage;
