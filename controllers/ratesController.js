const fetch = require('node-fetch')

module.exports = getExchangeRates = (req, res) => {
     //check if there are no query parameters
    if (Object.entries(req.query).length === 0){
        res.status(404).send({error:'Base Currency and Currencies to be exchanged with must be sent'})
    }
    //check if the query parameter does not have a base currency
    else if(!Object.keys(req.query).includes('base')){
        res.status(404).send({error:'Base Currency must be present'})
    }
    //Check if the query parameter does not have comparing currency
    else if(!Object.keys(req.query).includes('currency')){
        res.status(404).send({error:'Currency/Currencies to be exchanged with must be present'})
    }else {
        const {base} = req.query;
        //MAKE REQUEST TO THE SERVER ACCORDING TO THE BASE CURRENCY REQUESTED
        fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
        .then(response => response.json())
        .then(data => {
           const {base,date,error,rates} = data
           let filteredRates = !error && filterCurrencyHandler(req.query.currency, rates)
            let dataToSend = {
               base, date, error, rates: filteredRates
            }
            res.status(200).send({ results :{
              data:dataToSend
            }
            })
        }).catch(error => {
            res.status(400).send({error:error.message})
        })
    }
}

 const filterCurrencyHandler = ( currencyRates, rates) => {
  let currencyRatesArray = currencyRates.split(',')
  let computedData = {}
   currencyRatesArray.map(item => {
    computedData = {
        ...computedData,
        [item]: rates[item] || 'N/A'
    }
  })

return computedData
}
