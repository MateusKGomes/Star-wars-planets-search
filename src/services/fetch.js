const fetchData = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const json = await response.json();
    const results = await json.results;
    const removeresidents = results
      .map((result) => {
        delete result.residents;
        return result;
      });
    return removeresidents;
  } catch (error) {
    return error.message;
  }
};

export default fetchData;
