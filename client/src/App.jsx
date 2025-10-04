import React from 'react';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const handleCommentPosted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Comments</h1>
      <CommentForm onCommentPosted={handleCommentPosted} />
      <CommentList key={refreshTrigger} />
    </div>
  );
}

export default App;
