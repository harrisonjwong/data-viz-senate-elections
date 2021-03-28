import {getStates} from './data-service';

export const transformToStateConfig = (members, setCurrState) => {
  const allSenatorsFullObjects = members.filter(member => {
    const numTerms = member.terms.length;
    const currTerm = member.terms[numTerms - 1];
    return currTerm.type === 'sen';
  });

  const allSenatorsCleanedObjects = allSenatorsFullObjects.map(sen => {
    const recentTerm = sen.terms[sen.terms.length - 1];
    const party = recentTerm.party === 'Independent' ? 'Democrat' : recentTerm.party
    return {
      name: sen.name.official_full,
      party: party,
      state: recentTerm.state,
      rank: recentTerm.state_rank
    }
  });

  const senatorsByState = {};
  allSenatorsCleanedObjects.forEach(sen => {
    if (senatorsByState[sen.state]) {
      senatorsByState[sen.state].push(sen);
    } else {
      senatorsByState[sen.state] = [sen]
    }
  });

  const mapStateConfig = {};

  Object.entries(senatorsByState).forEach(arr => {
    const stateAbb = arr[0];
    const stateSens = arr[1]
    let partisanValue = 0;
    stateSens.forEach(sen => {
      if (sen.party === 'Democrat') {
        partisanValue++;
      } else {
        partisanValue--;
      }
    });
    let color;
    if (partisanValue === 0) {
      color = 'purple';
    } else if (partisanValue > 0) {
      color = 'blue';
    } else {
      color = 'red';
    }
    const seniorSenator = stateSens[0].rank === 'senior' ? stateSens[0] : stateSens[1];
    const juniorSenator = stateSens[0].rank === 'junior' ? stateSens[0] : stateSens[1];
    const clickHandler = () => {
      setCurrState(stateAbb);
    }
    mapStateConfig[stateAbb] = {fill: color, clickHandler, seniorSenator, juniorSenator};
  });

  return mapStateConfig;
}

export const transformSenateResults = async (senateRaces, setCurrState) => {
  const demHold = 'lightskyblue';
  const demGain = 'royalblue';
  const repHold = 'lightcoral';
  const repGain = 'firebrick';
  const states = await getStates();
  const output = {};
  senateRaces.forEach(race => {
    const splitResults = race.results.split("\n");
    const winner = splitResults[0].split(' ');
    const second = splitResults[1].split(' ');
    const winnerPct = parseFloat(winner[winner.length - 1]);
    const secondPct = parseFloat(second[second.length - 1]);
    const winnerParty = winner[winner.length - 2].substring(1, winner[winner.length - 2].length - 1);
    const secondParty = second[second.length - 2].substring(1, second[second.length - 2].length - 1);
    const winnerName = winner.slice(0, winner.length - 2).join(' ');
    const secondName = second.slice(1, second.length - 2).join(' ');
    let color;
    if (race.incumbentParty === winnerParty) {
      if (winnerParty === 'Democratic' || winnerParty === 'Independent') {
        color = demHold;
      } else if (race.incumbentParty === 'Republican') {
        color = repHold;
      }
    } else {
      if (winnerParty === 'Democratic' || winnerParty === 'Independent') {
        color = demGain;
      } else if (winnerParty === 'Republican') {
        color = repGain;
      }
    }
    if (race.type === 'regular') {
      output[states[race.state]] = {
        fill: color,
        clickHandler: (event) => setCurrState(states[race.state]),
        winnerPct,
        secondPct,
        winnerParty,
        secondParty,
        winnerName,
        secondName
      };
    } else {
      output[`${states[race.state]}-special`] = {
        fill: color,
        clickHandler: (event) => setCurrState(states[race.state]),
        winnerPct,
        secondPct,
        winnerParty,
        secondParty,
        winnerName,
        secondName
      };
    }

  });
  return output;
}