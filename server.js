const Main = require("./main");
const Express = require('express');
const BodyParser = require('body-parser');

const app = Express();

const port = 8000;

app.use(Express.static(__dirname + '/client'));

// app.get('/', (req, res) => {
// 	res.send({"Error": "To get all amounts, go to /amounts"})
// });

app.get('/amounts', (req, res) => {
	res.status(200);
  res.send(new Main().getAmounts());
});

app.listen(port, () => {
  console.log('We are live on ' + port);
});