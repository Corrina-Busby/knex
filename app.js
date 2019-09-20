const express = require('express');
const app = express();
const router = express.Router();
const data = require('./data');

//using the get method
//app.get('/api/employees', (req, res)=>{
 //   res.send('Hello World');
//});

//app.post('/api/employees', (req, res)=>{
 //   res.send('${req.method} setup done!');
//});

app.all('/api/employees', (req, res)=>{
    res.send('HTTP POST setup done!');
});

app.route('/api/employees')
.get((req, res) =>{
    res.send('GET');
})
.post((req, res)=> {
    res.send('POST');
})
//all the above are the basic ways to create endpoints for http handlers in express

//this will be different from the rest of app methods call because it's mountable and this
router.get('/employees', (req, res)=> res.send(data))
// here we mounted /api to router
app.use('/api', router)

//we are going to use Xpress to work with static data, sometimes we want to serve some static
// we ate going to use images in the img folder
// we are going to use the express static middleware function, which we just need to specify
// we can also add any identifier which can specitfy i the first part
app.use('/images', express.static('images'))

// we are creating a restful api we going to using query parmeters or query strings
router.get('/employees', (req, res) =>{
    //with the curly brackets it means return is not explicit
    console.log(req.query) //we can access all the query parameters by call the req object
})

router.get('/employees/:id', (req, res) =>{
   const id = +req.params.id // here we are gathering the one employee info
   const employee = data.filter(d => d.id === id)
    console.log(req.params) 
    return res.send(employee) // send a single employee back
});

// we are specifying a port number which Express is going to be running
const port = 8080;
// here we are specifiying a callback function to start listing to port 8080
app.listen(port, () =>{
    console.log(`Server has started on port ${port}`);
});