import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import ApiService from '../services/api';

const CommentForm = ({ onCommentPosted }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter a comment');
      return;
    }

    if (!user) {
      setError('You must be logged in to comment');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      await ApiService.postComment(text.trim());
      setText('');
      
      if (onCommentPosted) {
        onCommentPosted();
      }
    } catch (err) {
      setError(err.message || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Add a Comment
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">
            {error}
          </div>
        )}
        
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {user ? `Posting as ${user.name}` : 'Please log in to comment'}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !text.trim() || !user}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

