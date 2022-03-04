var port = chrome.runtime.connect({name: 'market'});
var ticker = 'ETH'

document.getElementById('get-price').addEventListener('click', function() {
  port.postMessage({market: 'KRW-' + ticker})
})

document.getElementById('select-ticker').addEventListener('change', function() {
  ticker = this.value
})

port.onMessage.addListener(function(message) {
  document.getElementById('price-value').innerHTML = parseInt(message.price).toLocaleString()
})
