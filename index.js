const express = require('express');
const { sendJSONResponse } = require('./utils')

const app = express();
const port = 3000;

app.get('/', (req, res) => sendJSONResponse(res, 'My Rule-Validation API', 'success', 200, {
  name: 'Abioye Oyetunji',
  github: '@tunji17',
  email: 'oyetunjiabioye17@gmail.com',
  mobile: '+2348138542116',
  twitter: '@_2nji_'
},));

app.post('/validate-rule', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});