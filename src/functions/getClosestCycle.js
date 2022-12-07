// 결제일이 가장 가까운 TransactionCycle ID를 가져옵니다:
const getClosestCycle = storeState => {
  // cycleList 데이터를 못 가져왔다면 빈 오브젝트를 반환합니다.
  const {cycleList} = storeState;
  if (!cycleList) return {};

  const currentDate = new Date().getDate();
  let cycle = cycleList.filter(cycle => currentDate < cycle.paymentDay)[0];
  if (!cycle) {
    cycle = cycleList[0];
  }

  return cycle;
};

export default getClosestCycle;
