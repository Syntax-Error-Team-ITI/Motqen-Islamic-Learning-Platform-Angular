export const environment = {
  production: false,
  apiPort: 7103,
  get apiBaseUrl() {
    return `https://localhost:${this.apiPort}/api`;
  },
  endpoints: {},
};
