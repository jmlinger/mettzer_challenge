import React from 'react';
import PropTypes from 'prop-types';
import { SubHeaderOn } from '../styles/pages/table';

export default function SubHeaderFavOn(props) {
  const { setFavListOn } = props;

  return (
    <SubHeaderOn>
      <h3>Favorite Articles</h3>
      <div>
        <button type="button" onClick={() => setFavListOn(false)}>
          Search
        </button>
      </div>
    </SubHeaderOn>
  );
}

SubHeaderFavOn.propTypes = {
  setFavListOn: PropTypes.object
}.isRequired;
