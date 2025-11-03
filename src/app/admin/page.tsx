'use client';
import { useState, useEffect } from 'react';
import { PROJECTS_DATA } from '../data/projects';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [featuredProjectId, setFeaturedProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [adminPassword, setAdminPassword] = useState(''); // Store password for API calls

  // Load current featured project on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchFeaturedProject();
    }
  }, [isAuthenticated]);

  const fetchFeaturedProject = async () => {
    try {
      const res = await fetch('/api/admin/featured');
      const data = await res.json();
      if (data.success && data.featuredProjectId) {
        setFeaturedProjectId(data.featuredProjectId);
      }
    } catch (error) {
      console.error('Error fetching featured project:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Verify password with API
    try {
      const res = await fetch('/api/admin/featured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          featuredProjectId: 'chatai', // dummy value for login check
          password: password 
        }),
      });

      if (res.status === 401) {
        setMessage({ type: 'error', text: 'Invalid password!' });
      } else {
        setAdminPassword(password); // Store for API calls
        setIsAuthenticated(true);
        setMessage({ type: 'success', text: 'Login successful!' });
        fetchFeaturedProject();
      }
    } catch {
      setMessage({ type: 'error', text: 'Login failed!' });
    }
    
    setPassword('');
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/featured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featuredProjectId,
          password: adminPassword, // Use stored password from login
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Featured project updated successfully!' });
        // Refresh page after 1 second to see the change
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error updating featured project' });
    }

    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-emerald-400 font-mono flex items-center justify-center p-4">
        <div className="terminal-border rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-black/60 border border-emerald-400 rounded-md text-emerald-100 focus:border-emerald-300 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-black font-bold py-2 px-4 rounded-md hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {message && (
              <div className={`text-sm text-center ${message.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-emerald-400 font-mono p-8">
      <div className="max-w-4xl mx-auto">
        <div className="terminal-border rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-emerald-300 hover:text-emerald-400"
            >
              Logout
            </button>
          </div>

          <div className="mb-8">
            <p className="text-emerald-300 mb-4">Manage Featured Project</p>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Select Featured Project</label>
                <select
                  value={featuredProjectId}
                  onChange={(e) => setFeaturedProjectId(e.target.value)}
                  className="w-full px-4 py-2 bg-black/60 border border-emerald-400 rounded-md text-emerald-100 focus:border-emerald-300 focus:outline-none"
                  required
                >
                  <option value="">-- Select a project --</option>
                  {PROJECTS_DATA.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.id} - {project.titleKey}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                disabled={loading || !featuredProjectId}
                className="w-full bg-emerald-500 text-black font-bold py-2 px-4 rounded-md hover:bg-emerald-400 transition-colors disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Featured Project'}
              </button>
            </form>

            {message && (
              <div className={`mt-4 text-sm ${message.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                {message.text}
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-emerald-700/40">
            <h2 className="text-xl font-bold mb-4">Available Projects</h2>
            <div className="grid gap-4">
              {PROJECTS_DATA.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 rounded border ${
                    project.id === featuredProjectId
                      ? 'border-emerald-400 bg-emerald-400/10'
                      : 'border-emerald-700/40 bg-black/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-emerald-300">{project.id}</p>
                      <p className="text-sm text-emerald-100/70">{project.titleKey}</p>
                    </div>
                    {project.id === featuredProjectId && (
                      <span className="text-xs bg-emerald-500 text-black px-2 py-1 rounded">
                        CURRENT
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

