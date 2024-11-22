import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProjectStore from '../store/projectStore';
import { PROJECT_TEMPLATES } from '../types/ProjectTypes';

export function CreateProject() {
  const navigate = useNavigate();
  const { createProject } = useProjectStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: 'private',
    templateId: PROJECT_TEMPLATES[0].id
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const template = PROJECT_TEMPLATES.find(t => t.id === formData.templateId);
    const project = await createProject({
      ...formData,
      language: template.language,
      files: template.files,
      defaultFile: template.defaultFile
    });
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Project Template
          </label>
          <select
            value={formData.templateId}
            onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 rounded-md"
          >
            {PROJECT_TEMPLATES.map(template => (
              <option key={template.id} value={template.id}>
                {template.name} - {template.description}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Project Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 rounded-md"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Visibility
          </label>
          <select
            value={formData.visibility}
            onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 rounded-md"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}