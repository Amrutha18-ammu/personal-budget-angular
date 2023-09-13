 const express = require('express');
 const app = express();
 const port = 3000;

 app.use('/', express.static('public'));

 const budget = {
    myMonthlyBudget: [
    {
        title: 'Power Bill',
        budget: 160
    },
    {
        title: 'Rent',
        budget: 350
    },
    {
        title: 'Groceries',
        budget: 90
    },
 ]
};

 app.get('/test', (req,res)=>{
    res.send ('Hello World');
 });

 app.get('/budget', (req,res) =>{
    res.json(budget);
 });  


 
 app.listen(port, () =>{
    console.log(`Serving at http://localhost:${port}`)
 });
