export default function FetchAPI() {
  return fetch("https://api.exchangeratesapi.io/latest?base=USD")
    .then((data) => data.json())
    .then((data) => data);
}
