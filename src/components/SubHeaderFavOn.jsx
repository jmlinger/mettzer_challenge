import React from 'react';
import PropTypes from 'prop-types';
import { SubHeaderOn } from '../styles/pages/table';

export default function SubHeaderFavOn(props) {
  const { setFavListOn } = props;

  return (
    <SubHeaderOn data-testid="subheader">
      <h3>Favorite Articles</h3>
      <div>
        <button type="button" onClick={() => setFavListOn(false)}>
          Search Mode
        </button>
      </div>
    </SubHeaderOn>
  );
}

SubHeaderFavOn.propTypes = {
  setFavListOn: PropTypes.object
}.isRequired;
