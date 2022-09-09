import React from 'react';
import { useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import PropTypes from 'prop-types';
import { FavBtn, FavOffIcon, FavOnIcon } from '../styles/components/icons';
import SubHeaderFavOn from './SubHeaderFavOn';
import SubHeaderFavOff from './SubHeaderFavOff';

export default function Table(props) {
  const {
    articles,
    getArticles,
    search,
    setSearch,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange
  } = props;
  const [favListOn, setFavListOn] = useState(false);
  const [favList, setFavList] = useState(
    localStorage.getItem('favList') !== undefined ? JSON.parse(localStorage.getItem('favList')) : []
  );

  const handleFavList = (article) => {
    const isOnFavList = favList.some((fav) => article['_id'] === fav['_id']);
    if (isOnFavList) {
      const removeArticle = favList.filter((fav) => article['_id'] !== fav['_id']);
      setFavList(removeArticle);
      localStorage.setItem('favList', JSON.stringify(removeArticle));
    } else {
      const addArticle = [...favList, article];
      setFavList(addArticle);
      localStorage.setItem('favList', JSON.stringify(addArticle));
    }
  };

  createTheme('default', {
    background: {
      default: '#F3EACE'
    }
  });

  const sortCaseAccentInsensitive = (strA, strB) => {
    const a = !strA
      ? ''
      : strA
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
    const b = !strB
      ? ''
      : strB
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

    if (a > b) {
      return 1;
    }

    if (b > a) {
      return -1;
    }

    return 0;
  };

  const columns = [
    {
      name: 'Favorite',
      button: true,
      responsive: true,
      center: true,
      width: '10vw',
      cell: (row) => (
        <FavBtn type="button" onClick={() => handleFavList(row)}>
          {favList !== [] ? (
            favList.some((fav) => row['_id'] === fav['_id']) ? (
              <FavOnIcon />
            ) : (
              <FavOffIcon />
            )
          ) : (
            <FavOffIcon />
          )}
        </FavBtn>
      )
    },
    {
      name: 'Authors',
      selector: (row) => row['_source'].authors,
      sortable: true,
      responsive: true,
      center: true,
      wrap: true,
      width: '15vw',
      format: (row) =>
        row['_source'].authors
          ? row['_source'].authors.toString().length >= 100
            ? `${row['_source'].authors.toString().slice(0, 100)}...`
            : row['_source'].authors.toString()
          : ''
    },
    {
      name: 'Type',
      selector: (row) => row['_type'],
      sortable: true,
      responsive: true,
      center: true,
      width: '10vw'
    },
    {
      name: 'Title',
      selector: (row) => row['_source'].title,
      responsive: true,
      sortable: true,
      center: true,
      wrap: true,
      width: '15vw',
      format: (row) =>
        row['_source'].title
          ? row['_source'].title.toString().length >= 150
            ? `${row['_source'].title.toString().slice(0, 150)}...`
            : row['_source'].title.toString()
          : ''
    },
    {
      name: 'Description',
      selector: (row) => row['_source'].description,
      responsive: true,
      sortable: true,
      center: true,
      wrap: true,
      width: '20vw',
      sortFunction: (rowA, rowB) =>
        sortCaseAccentInsensitive(rowA['_source'].description, rowB['_source'].description),
      format: (row) =>
        row['_source'].description
          ? row['_source'].description.toString().length >= 250
            ? `${row['_source'].description.toString().slice(0, 250)}...`
            : row['_source'].description.toString()
          : ''
    },
    {
      name: 'Urls',
      button: true,
      responsive: true,
      sortable: true,
      center: true,
      width: '15vw',
      cell: (row) => (
        <a href={row['_source'].urls} target="_blank" rel="noopener noreferrer">
          {row['_source'].urls}
        </a>
      )
    }
  ];

  const customStyles = {
    rows: {
      style: {
        fontSize: '15px',
        minHeight: '55px',
        fontWeight: '450',
        backgroundColor: '#F3EACE'
      }
    },
    headCells: {
      style: {
        color: 'white',
        backgroundColor: '#2ad0d2',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    cells: {
      style: {
        color: '#363636'
      }
    }
  };

  return (
    <div>
      <DataTable
        title="Scientific Articles"
        theme="default"
        columns={columns}
        data={favListOn ? favList : articles.data}
        customStyles={customStyles}
        responsive
        highlightOnHover
        pointerOnHover
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        actions
        fixedHeader
        fixedHeaderScrollHeight="60vh"
        subHeader
        subHeaderComponent={
          !favListOn ? (
            <SubHeaderFavOff
              setFavListOn={setFavListOn}
              getArticles={getArticles}
              search={search}
              setSearch={setSearch}
            />
          ) : (
            <SubHeaderFavOn setFavListOn={setFavListOn} />
          )
        }
      />
    </div>
  );
}

Table.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  getArticles: PropTypes.func,
  setShouldUpdate: PropTypes.object,
  search: PropTypes.object,
  setSearch: PropTypes.object,
  totalRows: PropTypes.number,
  loading: PropTypes.number,
  handlePageChange: PropTypes.func,
  handlePerRowsChange: PropTypes.func
}.isRequired;
