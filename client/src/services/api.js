const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Comments API
  async getComments() {
    return this.request('/comments');
  }

  async postComment(text, parentId = null) {
    return this.request('/comments', {
      method: 'POST',
      body: JSON.stringify({ text, parentId }),
    });
  }

  async likeComment(commentId) {
    return this.request(`/comments/${commentId}/like`, {
      method: 'PATCH',
    });
  }

  async deleteAllComments() {
    return this.request('/comments', {
      method: 'DELETE',
    });
  }

  // User API
  async getCurrentUser() {
    return this.request('/user');
  }
}

export default new ApiService();