import { useState, useEffect } from "react";

export default function App() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(""); // Enter an existing user ID from your DB

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("http://localhost:3000/comments");
      const data = await res.json();

      const map = {};
      const roots = [];
      data.forEach(c => (map[c.id] = { ...c, children: [] }));
      data.forEach(c => {
        if (c.parentId) {
          if (map[c.parentId]) map[c.parentId].children.push(map[c.id]);
        } else {
          roots.push(map[c.id]);
        }
      });

      setComments(roots);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const postComment = async (parentId = null) => {
    if (!text.trim() || !userId) return;

    try {
      await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId, parentId }),
      });
      setText("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const renderComments = (list, level = 0) => {
    return list.map(c => (
      <div key={c.id} style={{ marginLeft: level * 20, borderLeft: level ? "1px solid #ccc" : "none", paddingLeft: 10, marginTop: 10 }}>
        <div><strong>{c.author?.name || "Unknown"}</strong>: {c.text}</div>
        <button onClick={() => postComment(c.id)} style={{ fontSize: 12, marginTop: 5 }}>Reply</button>
        {c.children.length > 0 && renderComments(c.children, level + 1)}
      </div>


));
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>Comments</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          style={{ width: "70%", padding: 5 }}
        />
        <input
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="Your user ID"
          style={{ width: "25%", padding: 5, marginLeft: 5 }}
        />
        <button onClick={() => postComment()} style={{ marginLeft: 5 }}>Post</button>
      </div>
      {comments.length === 0 ? <div>No comments yet</div> : renderComments(comments)}
    </div>
  );
}
