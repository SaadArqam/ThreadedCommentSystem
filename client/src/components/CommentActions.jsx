import React from 'react';

const CommentActions = ({ 
  likes, 
  hasLiked, 
  isLiking, 
  onLike, 
  onReply, 
  canReply = true 
}) => {
  return (
    <div className="flex items-center space-x-4 text-sm">
      <button
        onClick={onLike}
        disabled={isLiking}
        className={`flex items-center space-x-1 transition-colors duration-200 ${
          hasLiked 
            ? 'text-red-500 hover:text-red-600' 
            : 'text-gray-500 hover:text-red-500'
        } ${isLiking ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <svg 
          className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} 
          viewBox="0 0 20 20"
        >
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
        <span>{likes}</span>
      </button>

      {canReply && (
        <button
          onClick={onReply}
          className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Reply</span>
        </button>
      )}
    </div>
  );
};

export default CommentActions;

