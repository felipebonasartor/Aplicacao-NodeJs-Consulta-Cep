const configApi = require('../../config/config-address');

const cepSearch = require('busca-cep');
const requestPromise = require('request-promise');
const soap = require('soap');

function AddressService() {
}

/**
 *  Método responsável em retornar o endereço pelo número do CEP informado.
 *  Busca as informações do endereço pelo componente do NPM (busca-cep).
 */
AddressService.prototype.getAddressByNpm = function (zipCode) {
    console.log('Consumindo módulo (buca-cep) do NPM.');

    try {
        var result = cepSearch(zipCode, { sync: true });
        if (!result.hasError) {
            console.log(`Endereço encontrado com sucesso. ${JSON.stringify(result)}`);
            return result;
        } else {
            console.log(`Ocorreu um erro ao tentar buscar o endereço do CEP informado: Código do erro: ${result.statusCode}. Ex: ${result.message}`);
        }

    } catch (ex) {
        console.log(`Ocorreu um erro insesperado ao tentar buscar o endereço: Ex: ${JSON.stringify(ex)}`);
    }
}

/**
 *  Método responsável em retornar o endereço pelo número do CEP informado.
 *  Busca as informações do endereço via REST pelo Servidor VIA CEP: https://viacep.com.br/.
 */
AddressService.prototype.getAddressByRest = function (zipCode, callbackSucess, callbackError) {
    console.log(`Consumindo API ViaCep. CEP: ${zipCode}`);

    let requestParams = {
        json: true,
        uri: `${configApi.viaCepUrl}/ws/${zipCode}/json`,
        timeout: 5000
    };

    requestPromise(requestParams)
        .then(callbackSucess)
        .catch(callbackError);
}


/**
 *  Método responsável em retornar o endereço pelo número do CEP informado.
 *  Busca as informações do endereço via SOAP pelo Servidor dos Correios 
 *  https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl.
 */
AddressService.prototype.getAddressBySoap = function (zipCodeData, callback) {
    console.log(`Consumindo API SOAP dos Correios. CEP: ${zipCodeData.cep}`);    

    soap.createClient(configApi.correiosUrl, function (err, clientResponse) {
        console.log('Conectando ao servidor dos correios.');        
        clientResponse.consultaCEP(zipCodeData, callback);
    });
}


module.exports = function () {
    return AddressService;
}