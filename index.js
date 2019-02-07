const app = require('./config/custom-express')();

app.listen(3000, function () {
    console.log('Executando servidor Node na porta: 3000');
});

