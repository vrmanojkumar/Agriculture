import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface AdminAuthProps {
  villageId: string;
  villageName: string;
  onBack: () => void;
  onAdminLogin: (admin: any) => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ 
  villageId, 
  villageName, 
  onBack, 
  onAdminLogin 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const villageColor = villageId === 'village-1' ? 'green' : 'blue';

  // Demo admin credentials
  const demoCredentials = {
    'village-1': { email: 'admin1@village.edu', password: 'admin123' },
    'village-2': { email: 'admin2@village.edu', password: 'admin123' }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check demo credentials first
      const demo = demoCredentials[villageId as keyof typeof demoCredentials];
      if (email === demo.email && password === demo.password) {
        const adminData = {
          id: `admin-${villageId}`,
          email: demo.email,
          village_id: villageId,
          name: `Admin ${villageId === 'village-1' ? '1' : '2'}`,
          role: 'admin'
        };
        onAdminLogin(adminData);
        return;
      }

      // Try Supabase authentication
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error('Invalid credentials');
      }

      // Check if user is admin for this village
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .eq('village_id', villageId)
        .single();

      if (adminError || !adminData) {
        throw new Error('You are not authorized as an admin for this village');
      }

      onAdminLogin(adminData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <button
          onClick={onBack}
          className={`flex items-center text-${villageColor}-600 hover:text-${villageColor}-700 mb-6 font-medium`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to {villageName}
        </button>

        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-${villageColor}-100 rounded-full mb-4`}>
            <Lock className={`w-8 h-8 text-${villageColor}-600`} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">
            Sign in to manage {villageName}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-${villageColor}-600 text-white py-2 px-4 rounded-md hover:bg-${villageColor}-700 focus:outline-none focus:ring-2 focus:ring-${villageColor}-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 text-xs font-medium mb-2">Demo Admin Credentials:</p>
          <div className="text-xs text-blue-700">
            <p><strong>Email:</strong> {demoCredentials[villageId as keyof typeof demoCredentials].email}</p>
            <p><strong>Password:</strong> {demoCredentials[villageId as keyof typeof demoCredentials].password}</p>
          </div>
        </div>
      </div>
    </div>
  );
};