import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useUser } from '../contexts/UserContext';
import ApiService from '../services/api';
import ReplyForm from './ReplyForm';
import CommentActions from './CommentActions';

const Comment = ({ comment, onCommentUpdate, level = 0 }) => {
  const { user } = useUser();
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

  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Just now';
    }
  };

  const maxLevel = 5; // Limit nesting depth
  const shouldShowReply = level < maxLevel;

  return (
    <div className={`comment ${level > 0 ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-2">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {comment.author?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                {comment.author?.name || 'Unknown User'}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                {formatTime(comment.timestamp)}
              </span>
            </div>
          </div>
        </div>

        {/* Comment Content */}
        <div className="text-gray-800 mb-3">
          {comment.text}
        </div>

        {/* Comment Actions */}
        <CommentActions
          likes={likes}
          hasLiked={hasLiked}
          isLiking={isLiking}
          onLike={handleLike}
          onReply={() => setIsReplying(true)}
          canReply={shouldShowReply}
        />
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="ml-4 mb-4">
          <ReplyForm
            parentId={comment.id}
            onReplyPosted={handleReplyPosted}
            onCancel={() => setIsReplying(false)}
          />
        </div>
      )}

      {/* Nested Comments */}
      {comment.children && comment.children.length > 0 && (
        <div className="nested-comments">
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
