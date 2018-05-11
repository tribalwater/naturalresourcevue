import * as actions from "../consts/ActionTypes";

export const startNetwork = (payload = 'global') => ({
  type: actions.START_NETWORK,
  payload
});

export const endNetwork = (payload = 'global') => ({
  type: actions.END_NETWORK,
  payload
});