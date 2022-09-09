import React from 'react';
import PropTypes from 'prop-types';
import { SubHeaderOff } from '../styles/pages/table';

export default function SubHeaderFavOff(props) {
  const { setFavListOn, getArticles, search, setSearch } = props;

  const handleSearchBar = ({ target: { name, value } }) => {
    setSearch({ ...search, [name]: value });
  };

  const submitSearch = () => {
    return getArticles();
  };
  console.log(search);

  return (
    <SubHeaderOff>
      <h3>Search for Articles</h3>
      <div>
        <button type="button" onClick={() => setFavListOn(true)}>
          Favorites
        </button>
        <label>
          Search:
          <input type="text" name="string" onChange={handleSearchBar} />
          <button type="button" disabled={!search.string} onClick={() => submitSearch()}>
            Submit
          </button>
        </label>
      </div>
    </SubHeaderOff>
  );
}

SubHeaderFavOff.propTypes = {
  setFavListOn: PropTypes.object,
  getArticles: PropTypes.func,
  search: PropTypes.object,
  setSearch: PropTypes.object
}.isRequired;
