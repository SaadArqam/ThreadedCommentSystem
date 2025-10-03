import React from 'react';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Header';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const handleCommentPosted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <CommentForm onCommentPosted={handleCommentPosted} />
          <CommentList key={refreshTrigger} />
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
