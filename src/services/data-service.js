export const getCurrentLegislators = () =>
  fetch(`https://theunitedstates.io/congress-legislators/legislators-current.json`)
    .then(response => response.json());

export const getSenateElection = (year) =>
  fetch(`data/${year}-senate.json`)
    .then(response => response.json());

export const getStates = () =>
  fetch(`data/states.json`)
    .then(response => response.json());

const api = {
  getCurrentLegislators
}

export default api;
