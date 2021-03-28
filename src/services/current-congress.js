export const getCurrentLegislators = () =>
  fetch(`https://theunitedstates.io/congress-legislators/legislators-current.json`)
    .then(response => response.json());

const api = {
  getCurrentLegislators
}

export default api;
