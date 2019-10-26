const express = require('express');

const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

const router = express.Router();

// Add path to HTML file to the router
router.get('/', (request, response) => {
  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Add .css and .js static files to the app
app.use('/style.css', express.static(path.join(__dirname, '/public/stylesheets')));
app.use(express.static(path.join(__dirname, '/public/javascripts/')));

// Add the router to the application
app.use('/', router);
// Set Server listening at PORT environment variable or 3000
app.listen(port);
// eslint-disable-next-line no-console
console.log('Server listening on http://localhost:%s', port);
