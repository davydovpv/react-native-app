loadData = async () => {
  await fetch('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH')

  .then(response => response.json())
  .then(json => {
    this.setState({
      BTC: json.BTC * data.lfiUSD
    });
  })
  .catch((error) => {
    console.error(error);
  });
}
