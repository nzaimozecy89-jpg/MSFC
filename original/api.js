// API Service for backend communication
const API_BASE = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('msfc_token');
  }

  // Set auth token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('msfc_token', token);
    } else {
      localStorage.removeItem('msfc_token');
    }
  }

  // Get auth headers
  getAuthHeaders() {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }

  // Generic API request
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async verifyToken() {
    try {
      const data = await this.request('/auth/verify');
      return data;
    } catch (error) {
      this.setToken(null);
      throw error;
    }
  }

  // Team management
  async getTeam(role) {
    const params = role ? `?role=${role}` : '';
    return this.request(`/team${params}`);
  }

  async createTeamMember(memberData, photoFile) {
    const formData = new FormData();

    // Add all member data
    Object.keys(memberData).forEach(key => {
      formData.append(key, memberData[key]);
    });

    // Add photo if provided
    if (photoFile) {
      formData.append('photo', photoFile);
    }

    return this.request('/team', {
      method: 'POST',
      headers: this.getAuthHeaders(), // Don't set Content-Type for FormData
      body: formData
    });
  }

  async updateTeamMember(id, memberData, photoFile) {
    const formData = new FormData();

    Object.keys(memberData).forEach(key => {
      formData.append(key, memberData[key]);
    });

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    return this.request(`/team/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: formData
    });
  }

  async deleteTeamMember(id) {
    return this.request(`/team/${id}`, {
      method: 'DELETE'
    });
  }

  // News management
  async getNews(query = {}) {
    const params = new URLSearchParams(query).toString();
    const url = `/news${params ? '?' + params : ''}`;
    return this.request(url);
  }

  async createNews(newsData, imageFile) {
    const formData = new FormData();

    Object.keys(newsData).forEach(key => {
      formData.append(key, newsData[key]);
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request('/news', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData
    });
  }

  async updateNews(id, newsData, imageFile) {
    const formData = new FormData();

    Object.keys(newsData).forEach(key => {
      formData.append(key, newsData[key]);
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request(`/news/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: formData
    });
  }

  async deleteNews(id) {
    return this.request(`/news/${id}`, {
      method: 'DELETE'
    });
  }

  // Gallery management
  async getGallery(query = {}) {
    const params = new URLSearchParams(query).toString();
    const url = `/gallery${params ? '?' + params : ''}`;
    return this.request(url);
  }

  async uploadGalleryItem(formData) {
    return this.request('/gallery', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData
    });
  }

  async updateGalleryItem(id, formData) {
    return this.request(`/gallery/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: formData
    });
  }

  async deleteGalleryItem(id) {
    return this.request(`/gallery/${id}`, {
      method: 'DELETE'
    });
  }

  // Fixtures management
  async getFixtures() {
    return this.request('/fixtures');
  }

  async createFixture(fixtureData) {
    return this.request('/fixtures', {
      method: 'POST',
      body: JSON.stringify(fixtureData)
    });
  }

  async updateFixture(id, fixtureData) {
    return this.request(`/fixtures/${id}`, {
      method: 'PUT',
      body: JSON.stringify(fixtureData)
    });
  }

  async deleteFixture(id) {
    return this.request(`/fixtures/${id}`, {
      method: 'DELETE'
    });
  }

  // Admin profile
  async getAdminProfile() {
    return this.request('/admin/profile');
  }
}

// Create global API instance
const api = new ApiService();

// Export for use in other files if needed
window.ApiService = ApiService;
window.api = api;