import React, { useState } from 'react';
import ApiService from '../services/api';

const ReplyForm = ({ parentId, onReplyPosted, onCancel }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    try {
      setIsSubmitting(true);
      await ApiService.postComment(text.trim(), parentId);
      setText('');
      
      if (onReplyPosted) {
        onReplyPosted();
      }
    } catch (err) {
      console.error('Failed to post reply:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 rounded-lg p-3 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
        disabled={isSubmitting}
      />
      <button
        type="button"
        onClick={onCancel}
        className="text-gray-500 hover:text-gray-700 mr-2"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSubmitting || !text.trim()}
        className="text-gray-500 hover:text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Posting...' : 'Reply'}
      </button>
    </form>
  );
};

export default ReplyForm;

