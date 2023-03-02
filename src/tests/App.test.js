import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/fetch';
import App from '../App';

const waitingTimer = (milissegundos) => {
  return new Promise(tempo  => {
   setTimeout(tempo, milissegundos);
  });
 }
 describe('test', () => {
   beforeEach(() => {
     global.fetch = jest.fn(testData)
   });
   afterEach(() => {
     jest.clearAllMocks()
   });
  
   // mock apresentado na mentoria

describe('Atinge 30% de cobertura na aplicação', () => {
  it('testa se App está sendo renderizado', () => {
    render(<App />);
    const header = screen.getByRole('heading', { name: /projeto star wars!/i });
    expect(header).toBeInTheDocument();
    const inputNameFilter = screen.getByTestId("name-filter");
    expect(inputNameFilter).toBeInTheDocument();
    const filterButton = screen.getByRole('button', {  name: /filtrar/i});
    expect(filterButton).toBeInTheDocument();
  });
  it('testa se a API está sendo chamada', async () => {
    

    render(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
   
    })
  it('verifica se o input filtra pelo nome', async () => {

    render(<App />);

    const inputNameFilter = screen.getByTestId("name-filter");
    userEvent.type(inputNameFilter, 'oo')
    await waitFor(() => {
      expect(screen.getByRole('columnheader', {  name: 'Tatooine'})).toBeInTheDocument();

    }, { timeout: 4000 })
  })
  it('verifica se as informações são filtradas com o igual a', async () => {

    render(<App />);
    await waitingTimer(4000)
    const selectColumn = screen.getByTestId('column-filter');
    const comparison = await screen.findByTestId('comparison-filter');
    const numberComparison = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', {  name: /filtrar/i});
    userEvent.selectOptions(selectColumn, 'diameter')
    userEvent.selectOptions(comparison, 'igual a')
    userEvent.type(numberComparison, '4900')
    const line = screen.queryAllByRole('row')
    expect(line).toHaveLength(11)
    userEvent.click(filterButton)
    expect(line).toHaveLength(11)
    expect(screen.getByText('4900').innerHTML).toContain('4900');
});
it('verifica se as informações são filtradas com o menor que', async () => {

  render(<App />);
await waitingTimer(4000)
   const comparison = screen.getByTestId("comparison-filter");
   const numberComparison = screen.getByTestId("value-filter");
   const selectColumn = await screen.findByTestId("column-filter");
   userEvent.selectOptions(selectColumn, screen.getByRole('option', { name: 'surface_water'}))
   userEvent.selectOptions(comparison, screen.getByRole('option', { name: 'menor que'}))
   userEvent.type(numberComparison, '7');
   const row = screen.queryAllByRole('row')
   expect(row).toHaveLength(11);
   userEvent.click(screen.getByTestId('button-filter'));
   expect(row).toHaveLength(11);
});
it('verifica se as informações são filtradas com o maior que', async () => {

  render(<App />);
  await waitingTimer(4000)

  const selectColumn = screen.getByTestId('column-filter');
  const comparison = screen.getByTestId('comparison-filter');
  const numberComparison = screen.getByTestId('value-filter');
  userEvent.selectOptions(selectColumn, 'diameter')
  userEvent.selectOptions(comparison, 'maior que')
  userEvent.type(numberComparison, '10200')
  expect(numberComparison).toHaveValue(10200)
  expect(comparison).toHaveValue('maior que')
  const filterButton = screen.getByRole('button', {  name: /filtrar/i});
  userEvent.click(filterButton)
    expect(screen.getByText('10465').innerHTML).toContain('10465');
  })
});
})
