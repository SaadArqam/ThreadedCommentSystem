import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import ApiService from '../services/api';

const ReplyForm = ({ parentId, onReplyPosted, onCancel }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter a reply');
      return;
    }

    if (!user) {
      setError('You must be logged in to reply');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      await ApiService.postComment(text.trim(), parentId);
      setText('');
      
      if (onReplyPosted) {
        onReplyPosted();
      }
    } catch (err) {
      setError(err.message || 'Failed to post reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setText('');
    setError(null);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
            {error}
          </div>
        )}
        
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your reply..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Reply'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;

