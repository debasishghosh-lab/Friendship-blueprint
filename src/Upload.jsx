import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsProcessing(true);
    try {
     const response = await axios.post(
        "https://friendship-blueprint-ef6y.onrender.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );


      console.log("✅ Server response:", response.data);

      // ✅ pass clusters via router state
      navigate("/dashboard", { state: { clusters: response.data.clusters } });
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4 mt-25">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Upload Your Dataset
          </h1>
          <p className="text-slate-600 text-lg">
            Prepare your friendship clustering analysis by uploading a properly formatted dataset
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Guide + Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <span>📘</span>
              <span>Input Format Guide</span>
            </h2>

            {/* CSV Preview */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Expected CSV Format
              </h3>
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-slate-700 leading-relaxed">
                  <code>
                        {`name,club_top1,club_top2,hobby_top1,hobby_top2,teamwork_preference
                        Alice,Chess,Debate,Reading,Coding,8
                        Bob,Soccer,Basketball,Gaming,Music,7
                        Charlie,Drama,Art,Painting,Theater,9`}
                  </code>
                </pre>
              </div>
              <p className="mt-3 text-sm text-slate-600 italic">
                Sample CSV with comma-separated values
              </p>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
                Important Notes
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>File must be <span className="font-semibold">.csv</span> format</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>Header names must match exactly as shown in the CSV</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span><span className="font-semibold">teamwork_preference</span> should be numeric (e.g., 1-10)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>Keep values consistent and clean (no missing or invalid data)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Upload Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <span>📤</span>
              <span>Upload Dataset</span>
            </h2>

            <div className="flex-1 flex flex-col justify-center">
              <p className="text-slate-600 mb-6 leading-relaxed">
                Choose a CSV dataset file to upload for clustering. Make sure your file follows the format guidelines on the left.
              </p>

              {/* File Input Area */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Select CSV File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-slate-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer border border-slate-300 rounded-lg p-2 transition-all duration-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {file && (
                  <p className="mt-3 text-sm text-green-600 font-medium flex items-center gap-2">
                    <span>✓</span>
                    <span>Selected: {file.name}</span>
                  </p>
                )}
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={isProcessing}
                className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  isProcessing
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing...</span>
                  </span>
                ) : (
                  'Upload and Process'
                )}
              </button>

              {/* Helper Text */}
              <p className="mt-6 text-center text-sm text-slate-500">
                Your data will be processed securely and used only for clustering analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;