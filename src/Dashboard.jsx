import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const clusters = location.state?.clusters || [];

  if (clusters.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">No Data Found</h2>
          <p className="text-slate-600 mb-6">
            Upload a dataset to see your friendship clusters
          </p>
          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Upload Dataset
          </button>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalMembers = clusters.reduce((sum, c) => sum + c.name.length, 0);
  const avgClusterSize = (totalMembers / clusters.length).toFixed(1);

  // Light blue theme for all clusters
  const colorClass = "bg-blue-50 border-blue-200 text-blue-800";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Your Friendship Groups
          </h1>
          <p className="text-slate-600 text-lg">
            We found {clusters.length} friendship groups with {totalMembers} people based on shared interests
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-slate-600 mb-1">Friendship Groups</p>
            <p className="text-3xl font-bold text-blue-600">{clusters.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-slate-600 mb-1">Total People</p>
            <p className="text-3xl font-bold text-purple-600">{totalMembers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-slate-600 mb-1">Average Group Size</p>
            <p className="text-3xl font-bold text-green-600">{avgClusterSize}</p>
          </div>
        </div>

        {/* Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {clusters.map((cluster, index) => {
            return (
              <div
                key={index}
                className={`${colorClass} rounded-lg border-2 p-6 shadow hover:shadow-lg transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">
                    Group {index + 1}
                  </h3>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
                    {cluster.name.length} {cluster.name.length === 1 ? 'person' : 'people'}
                  </span>
                </div>

                <div>
                  <p className="font-semibold mb-2">Group Members:</p>
                  <div className="space-y-1">
                    {cluster.name.map((member, idx) => (
                      <div key={idx} className="text-slate-700 pl-2">
                        • {member}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center">
  <button
    onClick={() => {
      // Go to home first
      window.location.href = "/#upload";
    }}
    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
  >
    Upload New Dataset
  </button>
</div>

      </div>
    </div>
  );
}

export default Dashboard;