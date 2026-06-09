'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Users, MessageSquare, AlertCircle, DollarSign, Loader2, Trash2, Shield, Bot } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AdminDashboardClient({ initialUsersCount, initialGroupsCount }: { initialUsersCount: number, initialGroupsCount: number }) {
  const [activeTab, setActiveTab] = useState<'users' | 'groups' | 'reports' | 'donations'>('users');
  const t = useTranslations('Admin');
  const supabase = createClient();

  const [users, setUsers] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [funds, setFunds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  async function fetchData(tab: string) {
    setIsLoading(true);
    if (tab === 'users') {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      setUsers(data || []);
    } else if (tab === 'groups') {
      const { data } = await supabase.from('groups').select('*').order('created_at', { ascending: false });
      setGroups(data || []);
    } else if (tab === 'reports') {
      const { data } = await supabase.from('reports').select('*, reporter:profiles!reporter_id(full_name), reported_user:profiles!reported_user_id(full_name)').order('created_at', { ascending: false });
      setReports(data || []);
    } else if (tab === 'donations') {
      const { data } = await supabase.from('donation_funds').select('*, groups(name)').order('created_at', { ascending: false });
      setFunds(data || []);
    }
    setIsLoading(false);
  }

  // User Actions
  const handleRoleChange = async (userId: string, newRole: string) => {
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    fetchData('users');
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    await supabase.from('profiles').delete().eq('id', userId);
    fetchData('users');
  };

  // Group Actions
  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm('Are you sure you want to delete this group?')) return;
    await supabase.from('groups').delete().eq('id', groupId);
    fetchData('groups');
  };

  // Report Actions
  const handleModerateReport = async (reportId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId })
      });
      const data = await res.json();
      if (data.success) {
        alert('AI Verdict: ' + data.verdict);
      } else {
        alert('Failed: ' + data.error);
      }
    } catch (e) {
      alert('Error triggering AI moderation');
    }
    fetchData('reports');
  };

  const handleResolveReport = async (reportId: string, status: string) => {
    await supabase.from('reports').update({ status }).eq('id', reportId);
    fetchData('reports');
  };

  const tabs = [
    { id: 'users', label: 'Users', icon: Users, count: initialUsersCount },
    { id: 'groups', label: 'Groups', icon: MessageSquare, count: initialGroupsCount },
    { id: 'reports', label: 'Reports', icon: AlertCircle, count: null },
    { id: 'donations', label: 'Donations', icon: DollarSign, count: null },
  ];

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-4 border-b border-gray-200 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
        {isLoading && users.length === 0 && groups.length === 0 && reports.length === 0 && funds.length === 0 ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="p-6 overflow-x-auto">
            {/* USERS TAB */}
            {activeTab === 'users' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-3 px-4 font-bold text-gray-700">User</th>
                    <th className="py-3 px-4 font-bold text-gray-700">Role</th>
                    <th className="py-3 px-4 font-bold text-gray-700">Joined</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{u.full_name || 'Anonymous'}</td>
                      <td className="py-4 px-4">
                        <select 
                          value={u.role || 'member'} 
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="bg-gray-50 border border-gray-200 text-sm rounded-md px-2 py-1"
                        >
                          <option value="member">Member</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-right">
                        <button onClick={() => handleDeleteUser(u.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="h-5 w-5" /></button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-gray-500">No users found.</td></tr>}
                </tbody>
              </table>
            )}

            {/* GROUPS TAB */}
            {activeTab === 'groups' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-3 px-4 font-bold text-gray-700">Group Name</th>
                    <th className="py-3 px-4 font-bold text-gray-700">Type</th>
                    <th className="py-3 px-4 font-bold text-gray-700">Created</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(g => (
                    <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{g.name}</td>
                      <td className="py-4 px-4"><span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{g.type}</span></td>
                      <td className="py-4 px-4 text-sm text-gray-500">{new Date(g.created_at).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-right">
                        <button onClick={() => handleDeleteGroup(g.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="h-5 w-5" /></button>
                      </td>
                    </tr>
                  ))}
                  {groups.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-gray-500">No groups found.</td></tr>}
                </tbody>
              </table>
            )}

            {/* REPORTS TAB */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                {reports.map(r => (
                  <div key={r.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                          {r.status.toUpperCase()}
                        </span>
                        <span className="text-sm font-medium text-gray-500">Target: {r.target_type}</span>
                      </div>
                      <p className="font-medium text-gray-900">Reason: {r.reason}</p>
                      <p className="text-sm text-gray-500 mt-1">Reported by: {r.reporter?.full_name || 'Anonymous'}</p>
                      {r.ai_verdict && (
                        <div className="mt-2 flex items-start gap-2 bg-blue-50 p-3 rounded-md text-sm text-blue-900">
                          <Bot className="h-5 w-5 shrink-0" />
                          <span><strong>AI Verdict:</strong> {r.ai_verdict}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button onClick={() => handleModerateReport(r.id)} className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200"><Bot className="h-4 w-4" /> Analyze</button>
                      <button onClick={() => handleResolveReport(r.id, 'resolved')} className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-200"><Shield className="h-4 w-4" /> Resolve</button>
                      <button onClick={() => handleResolveReport(r.id, 'dismissed')} className="flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-200"><Trash2 className="h-4 w-4" /> Dismiss</button>
                    </div>
                  </div>
                ))}
                {reports.length === 0 && <p className="text-center py-8 text-gray-500">No reports found. Good job!</p>}
              </div>
            )}

            {/* DONATIONS TAB */}
            {activeTab === 'donations' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-3 px-4 font-bold text-gray-700">Fund Name</th>
                    <th className="py-3 px-4 font-bold text-gray-700">Group</th>
                    <th className="py-3 px-4 font-bold text-gray-700">Goal</th>
                    <th className="py-3 px-4 font-bold text-gray-700">Raised</th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map(f => (
                    <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{f.name}</td>
                      <td className="py-4 px-4 text-gray-600">{f.groups?.name || 'N/A'}</td>
                      <td className="py-4 px-4">${f.goal_amount}</td>
                      <td className="py-4 px-4 text-green-600 font-bold">${f.raised_amount}</td>
                    </tr>
                  ))}
                  {funds.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-gray-500">No donation funds found.</td></tr>}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
