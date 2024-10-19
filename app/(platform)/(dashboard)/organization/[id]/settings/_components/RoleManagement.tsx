"use client";
import { useState } from "react";

const roles = ["Admin", "Editor", "Member", "Guest"];

const RoleManagement = () => {
  const [boardCreationRole, setBoardCreationRole] = useState("");
  const [boardDeletionRole, setBoardDeletionRole] = useState("");

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Access Management</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Board Creation Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Board Creation</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Who can create public boards?
            </label>
            <select
              className="w-full p-2 bg-gray-700 rounded-md"
              value={boardCreationRole}
              onChange={(e) => setBoardCreationRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Who can create private boards?
            </label>
            <select
              className="w-full p-2 bg-gray-700 rounded-md"
              value={boardCreationRole}
              onChange={(e) => setBoardCreationRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Board Deletion Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Board Deletion</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Who can delete public boards?
            </label>
            <select
              className="w-full p-2 bg-gray-700 rounded-md"
              value={boardDeletionRole}
              onChange={(e) => setBoardDeletionRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Who can delete private boards?
            </label>
            <select
              className="w-full p-2 bg-gray-700 rounded-md"
              value={boardDeletionRole}
              onChange={(e) => setBoardDeletionRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Invitation Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Invitation</h3>
          <p className="text-sm text-gray-400">Who can invite new members?</p>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Assign Role for Inviting Members
            </label>
            <select
              className="w-full p-2 bg-gray-700 rounded-md"
              value={boardDeletionRole}
              onChange={(e) => setBoardDeletionRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default RoleManagement;
