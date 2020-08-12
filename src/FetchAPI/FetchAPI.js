export default function FetchAPI(base) {
  return fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
    .then((data) => data.json())
    .then((data) => data);
}
