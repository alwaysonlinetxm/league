import { PropTypes } from 'react';

const MEMBER = PropTypes.shape({
  name: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired
});

export { MEMBER };
