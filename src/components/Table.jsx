import React, { useContext, useState } from 'react';
import Mycontext from '../context/myContext';

export default function Table() {
  const {
    data, setData, newData,
  } = useContext(Mycontext);

  const arrayOfOptionsInnitial = [
    'population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water',
  ];
  const [search, setSearch] = useState('');
  const [selectColumn, setSelectColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numberComparasion, setNumberComparasion] = useState(0);
  const [arrayOfOptions, setArrayOfOptions] = useState(arrayOfOptionsInnitial);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleClick = (event) => {
    event.preventDefault();
    const filtered = data
      .filter((result) => {
        if (comparison === 'maior que') {
          return +result[selectColumn] > +numberComparasion;
        }
        if (comparison === 'menor que') {
          return +result[selectColumn] < +numberComparasion;
        }
        if (comparison === 'igual a') {
          return +result[selectColumn] === +numberComparasion;
        }
        return true;
      });
    setData(filtered);
    const arr = arrayOfOptions.filter((item) => item !== selectColumn);
    setArrayOfOptions(arr);
    setSelectColumn(arr[0]);
    setSelectedFilters([...selectedFilters,
      { comparison, selectColumn, numberComparasion }]);
  };

  const deleteFilterByClick = (e, item) => {
    const newArr = selectedFilters
      .filter((el) => el.selectColumn !== e.target.id);
    setSelectedFilters(newArr);
    console.log(newArr, 'newArr');
    const arrSelect = item.selectColumn;
    setArrayOfOptions([...arrayOfOptions, arrSelect]);
    if (newArr.length === 0) {
      setData(newData);
    }
    const filterData = newData.filter((element) => {
      const filterNewArr = newArr.map((result) => {
        if (result.comparison === 'maior que') {
          return +element[result.selectColumn] > +result.numberComparasion;
        }
        if (result.comparison === 'menor que') {
          return +element[result.selectColumn] < +result.numberComparasion;
        }
        if (result.comparison === 'igual a') {
          return +element[result.selectColumn] === +result.numberComparasion;
        }
        return true;
      });
      return filterNewArr.every((filterNew) => filterNew);
    });
    const filterDataResults = [...filterData];
    setData(filterDataResults);
  };

  const handleClickClear = () => {
    setSelectedFilters([]);
    setSelectColumn('population');
    setComparison('maior que');
    setNumberComparasion(0);
    setArrayOfOptions(arrayOfOptionsInnitial);
    setData(newData);
  };

  return (
    <div>
      <input
        type="text"
        value={ search }
        data-testid="name-filter"
        onChange={ ({ target }) => {
          setSearch(target.value);
        } }
      />

      <select
        data-testid="column-filter"
        value={ selectColumn }
        onChange={ ({ target }) => {
          setSelectColumn(target.value);
        } }
      >
        {
          arrayOfOptions?.map((select) => (
            <option key={ select }>
              {select}
            </option>

          ))
        }
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => {
          setComparison(target.value);
        } }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>

      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ numberComparasion }
        onChange={ ({ target }) => {
          setNumberComparasion(target.value);
        } }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>

      <button
        type="submit"
        data-testid="button-remove-filters"
        onClick={ handleClickClear }
      >
        Limpar
      </button>

      {
        selectedFilters?.map((item, index) => (
          <div key={ index }>
            <span
              data-testid="filter"
              value={ index }

            >
              {item.selectColumn}
              {item.comparison}
              {item.numberComparasion}
              <button
                type="button"
                id={ item.selectColumn }
                onClick={ (e) => deleteFilterByClick(e, item) }
              >
                Deletar Filtro
              </button>
            </span>

          </div>
        ))
      }

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URl</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.filter(
              (item) => item.name.includes(search),
            ).map((planet) => (
              <tr key={ planet.name }>
                <th>
                  {planet.name}
                </th>
                <th>
                  {planet.rotation_period}
                </th>
                <th>
                  {planet.orbital_period}
                </th>
                <th>
                  {planet.diameter}
                </th>
                <th>
                  {planet.climate}
                </th>
                <th>
                  {planet.gravity}
                </th>
                <th>
                  {planet.terrain}
                </th>
                <th>
                  {planet.surface_water}
                </th>
                <th>
                  {planet.population}
                </th>
                <th>
                  {planet.films}
                </th>
                <th>
                  {planet.created}
                </th>
                <th>
                  {planet.edited}
                </th>
                <th>
                  {planet.url}
                </th>

              </tr>
            ))
          }
        </tbody>
      </table>
    </div>

  );
}
