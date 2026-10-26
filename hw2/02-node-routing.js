const http = require('http');

const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  {
    path: '/',
    status: 200,
    headers: { 'Content-Type': 'text/html' },
    body: 'Node Routing Exercise',
  },
  {
    path: '/welcome',
    status: 200,
    headers: { 'Content-Type': 'text/html' },
    body: '<h1>Welcome!</h1>',
  },
  {
    path: '/redirect',
    status: 302,
    headers: { Location: '/redirected' },
    body: '',
  },
  {
    path: '/redirected',
    status: 200,
    headers: { 'Content-Type': 'text/html' },
    body: '<h1>You have been redirected!</h1>',
  },
  {
    path: '/cache',
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'max-age=86400',
    },
    body: '<p>this resource was cached</p>',
  },
  {
    path: '/cookie',
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Set-Cookie': 'hello=world',
    },
    body: 'cookies… yummm',
  },
];

const server = http.createServer((req, res) => {
  const route = routes.find((item) => item.path === req.url);

  if (!route) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - page not found</h1>');
    return;
  }

  res.writeHead(route.status, route.headers);
  res.end(route.body);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
