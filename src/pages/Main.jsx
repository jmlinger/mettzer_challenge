import React, { useState } from 'react';
import { apiCustList } from '../services/apiCalls';
import Table from '../components/Table';
import { MainDiv } from '../styles/pages/main';

export default function Main() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState({
    column: 'name',
    string: ''
  });
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  console.log('renderizou');

  const getArticles = async (page) => {
    setLoading(true);

    const response = await apiCustList(search, page, perPage);

    if (response.status === 'OK') {
      setArticles(response);
      setTotalRows(response.totalHits >= 100 ? 100 : response.totalHits);
      setLoading(false);
    }

    if (response.status === 'Not found') {
      setArticles([]);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    getArticles(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await apiCustList(search, page, newPerPage);
    setArticles(response);
    setPerPage(newPerPage);
    setLoading(false);
  };

  return (
    <>
      <MainDiv>
        <Table
          articles={articles}
          getArticles={getArticles}
          search={search}
          setSearch={setSearch}
          totalRows={totalRows}
          loading={loading}
          handlePageChange={handlePageChange}
          handlePerRowsChange={handlePerRowsChange}
        />
      </MainDiv>
    </>
  );
}
