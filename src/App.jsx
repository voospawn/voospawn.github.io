import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './lib/supabase';
import useAuthStore from './store/authStore';
import { Editor } from './components/Editor';
import { ProjectList } from './components/ProjectList';
import { CreateProject } from './components/CreateProject';
import { Navbar } from './components/Navbar';

function App() {
  const { user, setUser, setSession } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route
              path="/login"
              element={
                !user ? (
                  <div className="max-w-md mx-auto p-4">
                    <Auth
                      supabaseClient={supabase}
                      appearance={{ theme: ThemeSupa }}
                      providers={['github']}
                    />
                  </div>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/new"
              element={
                user ? <CreateProject /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/project/:projectId"
              element={<Editor />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;