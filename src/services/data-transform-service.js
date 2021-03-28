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