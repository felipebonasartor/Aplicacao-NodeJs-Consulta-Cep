module.exports = (app) => {

    app.get('/api/address/npm/:zipCode', function (req, res) {
        let zipCode = req.params.zipCode;

        console.log(`Buscando endereço pelo CEP via componente do NPM (busca-cep). Cep: ${zipCode}`);

        let addressService = new app.services.addressService();

        let addressResult = addressService.getAddressByNpm(zipCode);

        if (addressResult)
            res.status(200).json(addressResult);
        else
            res.status(500).send(`Não foi possível encontrar o endereço do CEP: ${zipCode}`);
    });

    app.get('/api/address/rest/:zipCode', function (req, res) {
        let zipCode = req.params.zipCode;

        console.log(`Buscando endereço pelo CEP via REST usando o servidor VIA CEP. Cep: ${zipCode}`);

        let addressService = new app.services.addressService();

        addressService.getAddressByRest(zipCode, callbackSucess, callbackError);

        function callbackSucess(addressResult) {
            console.log(`Endereço encontrado com sucesso. ${JSON.stringify(addressResult)}`);
            res.status(200).json(addressResult);
        }

        function callbackError(err) {
            console.log(err)
            res.status(500).send(`Não foi possível encontrar o endereço do CEP: ${zipCode}`);
        }
    });

    app.get('/api/address/soap/:zipCode', function (req, res) {
        let zipCode = req.params.zipCode;

        console.log(`Buscando endereço pelo CEP via SOAP usando o servidor dos Correios. Cep: ${zipCode}`);

        let addressService = new app.services.addressService();

        let zipCodeData = { "cep": zipCode }

        addressService.getAddressBySoap(zipCodeData, function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).send(`Não foi possível encontrar o endereço do CEP: ${zipCode}`);
                return;
            }
            else {
                console.log(`Endereço encontrado com sucesso. ${JSON.stringify(result.return)}`);
                res.status(200).json(result.return);
            }
        });

    });

}