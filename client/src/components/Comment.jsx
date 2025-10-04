import React, { useState } from 'react';
import ApiService from '../services/api';
import ReplyForm from './ReplyForm';

const Comment = ({ comment, onCommentUpdate, level = 0 }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    
    try {
      setIsLiking(true);
      const updatedComment = await ApiService.likeComment(comment.id);
      setLikes(updatedComment.likes);
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error('Failed to like comment:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleReplyPosted = () => {
    setIsReplying(false);
    if (onCommentUpdate) {
      onCommentUpdate();
    }
  };

  return (
    <div className={`relative ${level > 0 ? 'ml-8' : ''}`}>
      {level > 0 && (
        <div className="absolute -left-8 top-0 bottom-0 w-8">
          <div className="absolute left-0 top-0 w-px h-full bg-gray-300"></div>
          <div className="absolute left-0 top-4 w-8 h-px bg-gray-300"></div>
        </div>
      )}
      
      <div className="bg-white rounded-lg p-4 border mb-2">
        <div className="flex items-start space-x-3 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
            <span className="text-white text-sm font-medium">
              {comment.author?.name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1">
            <div className="text-gray-800 mb-2">
              {comment.text}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{comment.author?.name || 'Anonymous'}</span>
              <button 
                onClick={handleLike}
                disabled={isLiking}
                className={`hover:text-gray-700 flex items-center space-x-1 ${hasLiked ? 'text-blue-500' : ''}`}
              >
                <span>❤️</span>
                <span>{likes}</span>
              </button>
              <button 
                onClick={() => setIsReplying(true)}
                className="hover:text-gray-700"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      {isReplying && (
        <div className="ml-4 mb-4">
          <ReplyForm
            parentId={comment.id}
            onReplyPosted={handleReplyPosted}
            onCancel={() => setIsReplying(false)}
          />
        </div>
      )}

      {comment.children && comment.children.length > 0 && (
        <div className="space-y-2">
          {comment.children.map((child) => (
            <Comment
              key={child.id}
              comment={child}
              onCommentUpdate={onCommentUpdate}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
