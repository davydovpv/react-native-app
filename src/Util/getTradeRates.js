export const GetTradeRates = async () => {

  await fetch('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH')
  .then(response => response.json())
  .then(json => {
    ethRate = json.ETH
    btcRate = json.BTC
    console.log(`Current Rates: ETH ${ethRate} / BTC ${btcRate}`)
  })
  .catch((error) => {
    console.error(error);
  });
}
