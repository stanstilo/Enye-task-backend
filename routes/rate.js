const router = require('express').Router()
const fetch = require('node-fetch')

router.route('/rates').get((req, res)=>{  
   const url = 'https://api.exchangeratesapi.io/latest?base=CZK&currency=EUR,GBP,USD'
    fetch(url).then(res=>
      res.json()).then(data=>
         res.status(202).send({
          rates:{
            "base":data.rates.base,
            "date":data,
             "rates":{
                "EUR":data.rates.EUR,
                "GBP":data.rates.GBP,
                "USD":data.rates.USD,
             }
          }
       }))
})


module.exports = router