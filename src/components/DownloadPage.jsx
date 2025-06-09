import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import "../styles/download.css";

const DownloadData = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataType, setDataType] = useState("carbon");
  const [password, setPassword] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleDownload = () => {
    if (!startDate || !endDate) {
      alert("Please select start and end dates.");
      return;
    }
    setShowPasswordPrompt(true);
  };

  const confirmDownload = async () => {
    if (password !== import.meta.env.VITE_DOWNLOAD_PASSWORD) {
      alert("Incorrect password.");
      return;
    }

    const baseURL =
      dataType === "carbon"
        ? "https://backend-express-production-1aad.up.railway.app/api/carbon/download"
        : "https://backend-express-production-1aad.up.railway.app/api/microclimate/download";

    const url = `${baseURL}?start=${startDate}&end=${endDate}`;

    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${dataType}-data-${format(
        new Date(),
        "yyyyMMdd-HHmmss"
      )}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadProgress("Success: File downloaded.");
      setShowPasswordPrompt(false);
      setPassword("");
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadProgress("Failed to download data.");
    }
  };

  return (
    <div className="flex h-screen bg-[#f1f9f1] custom-bg">
      <aside className="dashboardpage-sidebar">
        <div className="sidebar-logo-wrapper">
          <img src="/assets/Logo.png" alt="Logo" className="sidebar-logo" />
        </div>
        <h2 className="sidebar-title">Eddy Station</h2>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "sidebar-link sidebar-active" : "sidebar-link"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/download"
                className={({ isActive }) =>
                  isActive ? "sidebar-link sidebar-active" : "sidebar-link"
                }
              >
                Download Data
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "sidebar-link sidebar-active" : "sidebar-link"
                }
              >
                Back to Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

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
            className="w-full py-4 rounded-full font-semibold bg-green-600 text-white hover:bg-green-700 transition button-getdata"
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
        </div>
      </main>
    </div>
  );
};

export default DownloadData;
