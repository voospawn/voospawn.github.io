import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useProjectStore = create((set, get) => ({
  projects: [],
  currentProject: null,
  loading: false,
  error: null,

  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),

  fetchProjects: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ projects: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createProject: async (projectData) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        projects: [data, ...state.projects],
        currentProject: data,
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  forkProject: async (projectId) => {
    set({ loading: true });
    try {
      const originalProject = get().projects.find(p => p.id === projectId);
      if (!originalProject) throw new Error('Project not found');

      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...originalProject,
          id: undefined,
          forked_from: projectId,
          owner_id: (await supabase.auth.getUser()).data.user.id
        }])
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        projects: [data, ...state.projects],
        currentProject: data,
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));

export default useProjectStore;