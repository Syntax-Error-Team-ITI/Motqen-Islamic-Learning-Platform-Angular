export const environment = {
  production: false,
  apiPort: 7103,
  get apiBaseUrl() {
    return `https://localhost:${this.apiPort}/api`;
  },
  get meetingBaseUrl() {
    return `https://motqen.app.100ms.live/meeting/`;
  },
  endpoints: {},
};
