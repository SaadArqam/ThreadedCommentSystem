import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import ApiService from '../services/api';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const data = await ApiService.getComments();
      setComments(data);
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentUpdate = () => {
    fetchComments();
  };

  if (comments.length === 0) {
    return <div className="text-gray-500 text-center py-8">No comments yet</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <div key={comment.id} className="relative">
          <Comment
            comment={comment}
            onCommentUpdate={handleCommentUpdate}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
