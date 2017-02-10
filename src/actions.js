
export const actions = {
  PUSH: 'push',
  POP: 'pop',
  POP_TO_TOP: 'popToTop',
  RESET_TO: 'resetTo',
  REPLACE: 'replace',
  TAB_CHANGED: 'tabChanged',
  INIT_TABS: 'initTabs',
  NIVELATE: 'nivelate'
};

export const actionCreators = {
  push: {},
  resetTo: {},
  replace: {},
  pop: () => ({ type: actions.POP }),
  popToTop: () => ({ type: actions.POP_TO_TOP }),
  tabChanged: (tabIndex) => ({ type: actions.TAB_CHANGED, payload: { tabIndex } }),
  initTabs: (tabsCount, initialTab) => ({ type: actions.INIT_TABS, payload: { tabsCount, initialTab } })
};

export function initActions(routeDefs) {

  const routePayload = (name, params) => ({ route: { name, params } });

  const routeNames = Object.keys(routeDefs);
  for (const routeName of routeNames) {
    actionCreators.push[routeName] = (params) => {
      return {
        type: actions.PUSH,
        payload: routePayload(routeName, params)
      };
    };
    actionCreators.resetTo[routeName] = (params) => {
      return {
        type: actions.RESET_TO,
        payload: routePayload(routeName, params)
      };
    };
    actionCreators.replace[routeName] = (params) => {
      return {
        type: actions.REPLACE,
        payload: routePayload(routeName, params)
      };
    };
  }
}
