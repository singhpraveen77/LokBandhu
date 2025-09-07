import React from "react";

export default function Dashboard() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden bg-gray-50"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <h1 className="text-[var(--text-primary)] text-xl font-bold">
              CivicConnect
            </h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-md bg-[var(--secondary-color)] text-[var(--primary-color)] font-semibold" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[var(--text-secondary)] hover:bg-gray-100 font-medium" href="#">
              <span className="material-symbols-outlined">folder_managed</span>
              <span>Content Management</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[var(--text-secondary)] hover:bg-gray-100 font-medium" href="#">
              <span className="material-symbols-outlined">group</span>
              <span>User Accounts</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[var(--text-secondary)] hover:bg-gray-100 font-medium" href="#">
              <span className="material-symbols-outlined">flag</span>
              <span>Reports</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[var(--text-secondary)] hover:bg-gray-100 font-medium" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span>System Settings</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[var(--text-secondary)] hover:bg-gray-100 font-medium" href="#">
              <span className="material-symbols-outlined">notifications</span>
              <span>Notifications</span>
            </a>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[var(--text-secondary)] hover:bg-gray-100 font-medium" href="#">
              <span className="material-symbols-outlined">help</span>
              <span>Help and Support</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[var(--text-secondary)] hover:bg-gray-100 font-medium" href="#">
              <span className="material-symbols-outlined">campaign</span>
              <span>Feedback</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                Dashboard
              </h1>
              <p className="text-[var(--text-secondary)] mt-1">
                Welcome back, Official User. Here's an overview of community activity.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center h-10 px-4 rounded-md bg-[var(--primary-color)] text-white text-sm font-bold tracking-wide shadow-sm hover:bg-blue-600 transition-colors">
                Manage Content
              </button>
              <button className="flex items-center justify-center h-10 px-4 rounded-md bg-white border border-gray-300 text-[var(--text-primary)] text-sm font-bold tracking-wide shadow-sm hover:bg-gray-50 transition-colors">
                View Reports
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-base font-medium text-[var(--text-secondary)]">Total Posts</h3>
              <p className="text-3xl font-bold text-[var(--text-primary)] mt-2">1,250</p>
              <p className="text-sm font-medium text-[var(--accent-green)] mt-1">+15%</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-base font-medium text-[var(--text-secondary)]">Active Users</h3>
              <p className="text-3xl font-bold text-[var(--text-primary)] mt-2">875</p>
              <p className="text-sm font-medium text-[var(--accent-green)] mt-1">+8%</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-base font-medium text-[var(--text-secondary)]">Reported Issues</h3>
              <p className="text-3xl font-bold text-[var(--text-primary)] mt-2">42</p>
              <p className="text-sm font-medium text-[var(--accent-red)] mt-1">-5%</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">2024-03-15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">Sarah Miller</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">Posted</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">New community event announcement</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">2024-03-14</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">David Chen</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">Commented</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">Response to event feedback</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">2024-03-13</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">Emily Davis</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">Reported</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">Inappropriate content flagged</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">2024-03-12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">Michael Brown</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">Joined</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">New user registration</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">2024-03-11</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">Jessica Wilson</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">Updated</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">Profile information changed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
