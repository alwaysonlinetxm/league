import { createSelector } from 'reselect';

function getList(state) {
  return state.home.list;
}

const getNames = createSelector(
  [ getList ],
  list => list.map(node => node.name)
)

export { getNames };
