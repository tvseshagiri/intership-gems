const app = require('./app/App')

const port = process.env.PORT || 5000;

//starting the server
app.listen(port, '0.0.0.0', () => {
    console.log(`API Server started on  http://localhost:${port}`);
});




