import React, { useState } from "react";

// Recursive comment component
function Comment({ comment, onReplyPosted }) {
  const [showReply, setShowReply] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  console.log('Rendering comment:', comment.id, 'with children:', comment.children?.length || 0);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:3000/comments/${comment.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        setHasLiked(!hasLiked);
      }
    } catch (err) {
      console.error('Failed to like comment', err);
    }
  };

  return (
    <div className="mb-4 ml-4 border-l-2 border-gray-300 pl-4">
      <div className="mb-1">
        <span className="font-semibold">{comment.author?.name || "Unknown"}</span>:{" "}
        {comment.text}
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{comment.timestamp ? new Date(comment.timestamp).toLocaleString() : 'Just now'}</span>
        <button onClick={() => setShowReply(!showReply)}>
          {showReply ? "Cancel" : "Reply"}
        </button>
        <button 
          onClick={handleLike}
          className={`${hasLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}
        >
          ❤️ {likes}
        </button>
      </div>

      {/* Reply form */}
      {showReply && (
        <ReplyForm parentId={comment.id} onReplyPosted={onReplyPosted} />
      )}

      {/* Render children recursively */}
      {comment.children && comment.children.length > 0 ? (
        <div className="mt-2">
          <div style={{ color: 'blue', fontSize: '12px' }}>Rendering {comment.children.length} replies:</div>
          {comment.children.map((child) => (
            <Comment key={child.id} comment={child} onReplyPosted={onReplyPosted} />
          ))}
        </div>
      ) : (
        <div style={{ color: 'red', fontSize: '12px' }}>No children found for comment {comment.id}</div>
      )}
    </div>
  );
}

// Reply form component
function ReplyForm({ parentId, onReplyPosted }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1; // hardcoded for demo; replace with logged-in user

    if (!text.trim()) return;

    try {
      await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId, parentId }),
      });
      setText("");
      if (onReplyPosted) {
        onReplyPosted();
      } else {
        window.location.reload(); // fallback refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        className="border border-gray-400 rounded px-2 py-1 w-full"
      />
      <button type="submit" className="mt-1 bg-blue-500 text-white px-3 py-1 rounded">
        Reply
      </button>
    </form>
  );
}

export { Comment };
