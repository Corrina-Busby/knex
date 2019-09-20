//We are going to create a function for handling a res to list all empolyees
const data = require('./data')

function listAllEmployees(req, res){
    //We are going to return an HTTP 200 with a json object of the data we have
    return res.status(200).json(data);
//instead of returning a static data we are going to return the result of the database query
// const connectikon = req.app
}
module.exports = {listAllEmployees};

