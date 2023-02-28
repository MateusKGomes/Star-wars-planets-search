import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import fetchData from '../services/fetch';
import MyContext from './myContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const infos = async () => {
      const resultsApi = await fetchData();
      setData(resultsApi);
    };
    infos();
  }, []);

  const values = useMemo(() => ({
    setData, data,
  }), [data]);

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
