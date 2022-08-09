import ECONOMY_TEAM_TYPES from "../../action/economyTeamAction";

const initialState = {
  id: "",
  listPlayers: [],
  countPaymentPlayers: 0,
  listCosts: [],
  totalCosts: 0,
  dividerCosts: 0,
};

export function EconomyTeamReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ECONOMY_TEAM_TYPES.ON_LOAD_DATAS: {
      const { players, costs } = payload;

      if (costs.length > 0) {
        state.totalCosts = costs
          .map((cost) => cost.price)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
      }

      if (players.length > 0) {
        state.countPaymentPlayers = players.filter(
          (player) => player.isPayment
        ).length;
      }

      if (state.totalCosts > 0 && state.countPaymentPlayers > 0) {
        state.dividerCosts = state.totalCosts / state.countPaymentPlayers;
      }

      return { ...state, listPlayers: players, listCosts: costs };
    }

    case ECONOMY_TEAM_TYPES.CHANGE_COUNT_PAYMENT_PLAYERS: {
      const { id, payment } = payload;

      const indexPlayer = state.listPlayers.findIndex(
        (player) => player._id === id
      );

      state.listPlayers[indexPlayer].isPayment = payment;

      if (state.listPlayers.length > 0) {
        state.countPaymentPlayers = state.listPlayers.filter(
          (player) => player.isPayment
        ).length;
      }

      if (state.totalCosts > 0 && state.countPaymentPlayers > 0) {
        state.dividerCosts = state.totalCosts / state.countPaymentPlayers;
      } else {
        state.dividerCosts = 0;
      }

      return { ...state, isPayment: payment };
    }

    case ECONOMY_TEAM_TYPES.ADD_COST: {
      const { cost } = payload;

      state.listCosts.push(cost);

      return state;
    }

    default:
      return state;
  }
}
