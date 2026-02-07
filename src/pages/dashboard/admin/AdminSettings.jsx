import { Link } from "react-router-dom";
import { Settings, User, Cog } from "lucide-react";

export default function AdminSettings() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-amber-100">
          <Settings className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
          <p className="text-gray-500 mt-0.5">Configure system parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/admin/profile"
          className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition"
        >
          <div className="p-3 rounded-xl bg-amber-100">
            <User className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">Profile</h2>
            <p className="text-sm text-gray-500">Edit your account details</p>
          </div>
        </Link>
        <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-3 rounded-xl bg-slate-100">
            <Cog className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">System Configuration</h2>
            <p className="text-sm text-gray-500">Grading rules, terms (coming soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
