import {getPresidentialElection} from './data-service';

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

export const transformSenateResults = (senateRaces, setCurrState, states) => {
  const demHold = 'lightskyblue';
  const demGain = 'royalblue';
  const repHold = 'lightcoral';
  const repGain = 'firebrick';
  const output = {};
  senateRaces.forEach(race => {
    const splitResults = race.results.split('\n');
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
        clickHandler: () => setCurrState(states[race.state]),
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
        clickHandler: () => setCurrState(states[race.state]),
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

export const transformColorsToMarginOfVictory = (parsedSenateResults) => {
  const returnValues = {}
  Object.entries(parsedSenateResults).forEach(race => {
    const stateAbb = race[0];
    const result = race[1];

    // Hue: Hue 0 = red, Hue ~236 = blue
    // Saturation, keep at 100% for simplicity
    // Lightness: 0% = black, 100% = white;
    // -> go from 96 (small victory) to 26 (large victory)
    let hue;
    let light;
    if (result.winnerParty === 'Democratic' || result.winnerParty === 'Independent') {
      let marginOfVictory = result.winnerPct - result.secondPct;
      if (marginOfVictory >= 35) {
        marginOfVictory = 35;
      }
      hue = 236;
      light = 96 - (2 * marginOfVictory);
    } else if (result.winnerParty === 'Republican') {
      let marginOfVictory = result.winnerPct - result.secondPct;
      if (marginOfVictory >= 35) {
        marginOfVictory = 35;
      }
      hue = 0;
      light = 96 - (2 * marginOfVictory);
    }
    result.fill = `hsl(${hue}, 100%, ${light}%)`;
    returnValues[stateAbb] = result;
  })
  return returnValues;

}

export const transformColorsToPresidentialComparison =
  async (parsedSenateResults, presidentialYear, setPresidentialResults, states) => {
    const returnValues = {};
    const presidentialResults = await getPresidentialElection(presidentialYear);
    setPresidentialResults(parsePresidentialResultsToSenateFormat(presidentialResults, states, presidentialYear));
    Object.entries(parsedSenateResults).forEach(race => {
      const originalStateAbb = race[0];
      const stateAbb = originalStateAbb.includes('-special') ? originalStateAbb.substring(0, 2) : originalStateAbb;
      const stateFull = states[stateAbb];
      const result = race[1];
      let marginOfVictory;
      if (result.winnerParty === 'Democratic' || result.winnerParty === 'Independent') {
        marginOfVictory = result.winnerPct - result.secondPct;
        // California exception
        if (result.winnerParty === 'Democratic' && result.secondParty === 'Democratic') {
          marginOfVictory = 40;
        }
      } else if (result.winnerParty === 'Republican') {
        marginOfVictory = (result.winnerPct - result.secondPct) * -1;
      }
      //fix for crash on hard reload?
      const presidential = presidentialResults.find(obj => obj.state === stateFull) || {};
      const presidentialMargin = (presidential.demPct * 100) - (presidential.repPct * 100);
      let senatePresDiff = marginOfVictory - presidentialMargin;
      if (senatePresDiff >= 40) {
        senatePresDiff = 40
      }
      if (senatePresDiff <= -40) {
        senatePresDiff = -40;
      }
      let hue;
      let light;
      if (senatePresDiff >= 0) {
        hue = 236;
        light = 96 - (2 * senatePresDiff);
      } else {
        hue = 0;
        light = 96 - (2 * (senatePresDiff * -1));
      }
      result.fill = `hsl(${hue}, 100%, ${light}%)`
      returnValues[originalStateAbb] = result;
    });
    return returnValues;
  }

export const parsePresidentialResultsToSenateFormat = (presidentialResults, states, presidentialYear) => {
  let demCandidate;
  let repCandidate;
  if (presidentialYear === '2020') {
    demCandidate = 'Joe Biden';
    repCandidate = 'Donald Trump';
  } else if (presidentialYear === '2016') {
    demCandidate = 'Hillary Clinton';
    repCandidate = 'Donald Trump';
  } else if (presidentialYear === '2012') {
    demCandidate = 'Barack Obama';
    repCandidate = 'Mitt Romney';
  }
  //winnerName, winnerParty, winnerPct, secondName, secondParty, secondPct
  const returnValues = {};
  presidentialResults.forEach(result => {
    const currState = {}
    const stateAbb = states && states[result.state];
    if (result.demPct > result.repPct) {
      currState.winnerName = demCandidate;
      currState.winnerParty = 'Democratic';
      currState.winnerPct = result.demPct * 100;
      currState.secondName = repCandidate;
      currState.secondParty = 'Republican';
      currState.secondPct = result.repPct * 100;
    } else {
      currState.secondName = demCandidate;
      currState.secondParty = 'Democratic';
      currState.secondPct = result.demPct * 100;
      currState.winnerName = repCandidate;
      currState.winnerParty = 'Republican';
      currState.winnerPct = result.repPct * 100;
    }
    returnValues[stateAbb] = currState;
  });
  return returnValues;
}

export const getHslRange = () => {
  const result = [];
  for (let i = 70; i >= 0; i--) {
    result.push(`hsl(${236}, 100%, ${96 - i}%`);
  }
  for (let i = 0; i < 70; i++) {
    result.push(`hsl(${0}, 100%, ${96 - i}%)`);
  }
  return result;
}