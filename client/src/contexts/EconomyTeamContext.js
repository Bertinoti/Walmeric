import { createContext, useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "./authContext";

import { EconomyTeamReducer } from "../Redux/reducers/EconomyTeamReducer";

import { getAllPlayersOneTeam, getAllCostsOneTeam } from "../api/axios";
import ECONOMY_TEAM_TYPES from "./Redux/action/economyTeamAction";

const EconomyTeamContext = createContext();

export function useEconomyTeamContext() {
  return useContext(EconomyTeamContext);
}

export function EconomyTeamProvider({ children }) {
  const { team } = useParams();
  const {
    currentUser: { accessToken },
  } = useAuth();
  const [economyTeam, dispatchEconomy] = useReducer(EconomyTeamReducer);

  useEffect(() => {
    let players = [];
    let costs = [];

    (async () => {
      const resPlayers = await getAllPlayersOneTeam(accessToken, team);
      players = resPlayers.players;

      const resCosts = await getAllCostsOneTeam(accessToken, team);
      costs = resCosts.costs;
      dispatchEconomy({
        type: ECONOMY_TEAM_TYPES.ON_LOAD_DATAS,
        payload: { players: players, costs: costs },
      });
    })();
  }, [team]);

  const setCountPaymentPlayers = (id, payment) => {
    dispatchEconomy({
      type: ECONOMY_TEAM_TYPES.CHANGE_COUNT_PAYMENT_PLAYERS,
      payload: { payment: payment, id: id },
    });
  };

  const setListCosts = (cost) => {
    dispatchEconomy({
      type: ECONOMY_TEAM_TYPES.ADD_COST,
      payload: { cost: cost },
    });
  };

  const value = {
    team,
    economyTeam,
    setCountPaymentPlayers,
    setListCosts,
  };

  return (
    <EconomyTeamContext.Provider value={value}>
      {children}
    </EconomyTeamContext.Provider>
  );
}
