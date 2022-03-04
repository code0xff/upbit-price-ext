var port = chrome.runtime.connect({name: 'market'})
var ticker = 'ETH'
var autoRefresh = false
var autoRefreshId
var beforePrice = 0

document.getElementById('get-price').addEventListener('click', function() {
  port.postMessage({market: 'KRW-' + ticker})
})

document.getElementById('select-ticker').addEventListener('change', function() {
  ticker = this.value
  document.getElementById('price-value').innerHTML = 0
})

document.getElementById('auto-refresh').addEventListener('click', function() {
  if (autoRefresh) {
    document.getElementById('auto-refresh').className = 'default-button'
    document.getElementById('get-price').className = 'default-button'
    document.getElementById('get-price').disabled = false
    document.getElementById('price-value').className = 'default'

    document.getElementById('select-ticker').disabled = false
    document.getElementById('select-ticker').className = 'default-select'

    clearInterval(autoRefreshId)
  } else {
    document.getElementById('auto-refresh').className = 'success-button'
    document.getElementById('get-price').className = 'disabled-button'
    document.getElementById('get-price').disabled = true

    document.getElementById('price-value').innerHTML = 0
    document.getElementById('select-ticker').disabled = true
    document.getElementById('select-ticker').className = 'disabled-select'

    autoRefreshId = setInterval(function() {
      port.postMessage({market: 'KRW-' + ticker})
    }, 1000)
  }
  autoRefresh = !autoRefresh
})

port.onMessage.addListener(function(message) {
  const currentPrice = parseInt(message.price)
  if (autoRefresh) {
    if (currentPrice === beforePrice) {
      document.getElementById('price-value').className = 'default'
    } else if (currentPrice > beforePrice) {
      document.getElementById('price-value').className = 'danger'
    } else {
      document.getElementById('price-value').className = 'primary'
    }
    beforePrice = currentPrice
  }

  document.getElementById('price-value').innerHTML = currentPrice.toLocaleString()
})
