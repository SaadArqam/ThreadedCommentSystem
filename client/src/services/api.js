const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://threadedcommentsystem.onrender.com';

class ApiService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30000; // 30 seconds
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const cacheKey = `${options.method || 'GET'}:${url}`;
    
    // Check cache for GET requests
    if (!options.method || options.method === 'GET') {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

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

      const data = await response.json();
      
      // Cache GET requests
      if (!options.method || options.method === 'GET') {
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
  }

  // Comments API
  async getComments() {
    return this.request('/comments');
  }

  async postComment(text, parentId = null) {
    const result = await this.request('/comments', {
      method: 'POST',
      body: JSON.stringify({ text, parentId }),
    });
    this.clearCache(); // Clear cache when new comment is posted
    return result;
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