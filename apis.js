const http =require('http');
const url = require('url');

const data = require('./data');

function employeesList(req, res){
    res.statusCode = 200;
    res.end(JSON.stringify(data));    

}
function addEmployee(req, res){
   let body = '';
   req.on('data', chunk => body += chunk.toString())
   req.on('end', () =>{
       data.push(JSON.parse(body))
       res.statusCode = 201;
       return res.end(`Added ${JSON.parse(body).name}`)
   });
   req.on('error', error =>{
       res.statusCode = 400;
   })
}

function errorRequest(req, res){
    res.statusCode = (200);
    res.end(`This api call is not supported`);

}

const server = http.createServer((req, res)=>{
    const urlEmployee = url.parse(req.url);
    //console.log(urlEmployee);

    if (urlEmployee.pathname === '/api/employees'){
        switch(req.method){
            case 'GET':
                employeesList(req, res);
                break;
                case 'POST':
                    addEmployee(req, res);
                    break;                  
                    default:
                            errorRequest(req, res);
        }
    } else{
        errorRequest(req,res)
    }

});
server.listen(8080, () => console.info(`Server started on port 8080`));