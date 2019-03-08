var request = require('request');

request.post(
    'http://localhost:1337/product/create',
    { json: { 
        nameOnMenu: 'pudding', 
        price: 35,
      } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        console.log(response)
    }
);