chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === 'market') {
    port.onMessage.addListener(function(message) {
      fetch('https://api.upbit.com/v1/ticker?markets=' + message.market)
        .then(function(response) {
          return response.json()
        })
        .then(function(jsonObj) {
          port.postMessage({price: jsonObj[0].trade_price})
        })
    })
  }
})
