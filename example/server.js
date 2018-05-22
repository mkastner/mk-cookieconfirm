const http = require('http');
const fs = require('fs');
const port = 4001;

function requestHandler(req, res) {
  
  let path = `example${req.url}`;
  
  if (req.url.match(/favicon\.ico$/)) {
    let binary = fs.readFileSync(path);
    res.writeHead(200, {
      'Content-Type': 'image/x-icon',
    });
    return res.end(binary, 'binary'); 
  }
  
  let contentType;  
  
  if (req.url.match(/\.js$/)) {
    contentType = 'application/javascript';
  } else if (req.url.match(/\.css/)) {
    contentType = 'text/css';
  } else {
    
    contentType = 'text/html';
    
    if (req.url.match(/\/$/)) {
      path += 'index'; 
    } 
    path += '.html';
  }

  if (path.match(/\?/)) {
    path = path.split('?')[0];
  } 

  const index = fs.readFileSync(path);
  res.writeHead(200, {'Content-Type': contentType});
  res.end(index); 
  //res.end(`This server is running on port ${port}`);
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {

  if (err) {
    return console.error(err);
  }

  console.log(`server is listening on ${port}`);

});

