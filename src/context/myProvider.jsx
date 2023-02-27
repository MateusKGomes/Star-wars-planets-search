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
    setData, data
  }), [setData, data]);

  return (
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  )
}

export default Provider;