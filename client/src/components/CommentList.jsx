import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Comment from './Comment';
import ApiService from '../services/api';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState(0);

  const fetchComments = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    // Don't fetch if we fetched recently (unless forced)
    if (!forceRefresh && now - lastFetch < 5000) {
      return;
    }

    try {
      setLoading(true);
      const data = await ApiService.getComments();
      setComments(data);
      setLastFetch(now);
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setLoading(false);
    }
  }, [lastFetch]);

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentUpdate = useCallback(() => {
    fetchComments(true); // Force refresh when comment is updated
  }, [fetchComments]);

  const memoizedComments = useMemo(() => comments, [comments]);

  if (loading) {
    return <div className="text-gray-500 text-center py-8">Loading comments...</div>;
  }

  if (comments.length === 0) {
    return <div className="text-gray-500 text-center py-8">No comments yet</div>;
  }

  return (
    <div className="space-y-4">
      {memoizedComments.map((comment) => (
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
