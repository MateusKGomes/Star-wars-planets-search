import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import fetchData from '../services/fetch';
import MyContext from './myContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    const infos = async () => {
      const resultsApi = await fetchData();
      setData(resultsApi);
      setNewData(resultsApi);
    };
    infos();
  }, []);

  const values = useMemo(() => ({
    setData, data, newData,
  }), [data, newData]);

  return (
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
