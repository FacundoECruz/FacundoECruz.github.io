export const types = {
  addBid: "bid - add",
  resetBid: "bid - reset",
  addLost: "lost - add",
  resetLost: "lost - reset",
  clean: "round - clean",
};

// function reducer(state, action) {
//   switch (action.type) {
//     case types.addBid: {
//       return {
//         ...state,
//         bid: (state[action.index].bid += 1),
//       };
//     }
//     case types.resetBid: {
//       let newState = { ...state };
//       newState[action.index].bid = 0;
//       return newState;
//     }
//     case types.addLost: {
//       return {
//         ...state,
//         bidsLost: (state[action.index].bidsLost += 1),
//       };
//     }
//     case types.resetLost: {
//       let newState = { ...state };
//       newState[action.index].bidsLost = 0;
//       return newState;
//     }
//     case types.clean: {
//       let newState = { ...state };
//       newState.map((p) => {
//         p.bid = 0;
//         p.bidsLost = 0;
//       });
//       return newState;
//     }
//     default:
//       return state;
//   }
// }

// export default reducer