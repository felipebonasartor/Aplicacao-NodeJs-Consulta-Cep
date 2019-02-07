# nodejs-cep-rest-soap-npm
Api de teste construída em Node.Js para retornar CEP's Brasileiros com serviços REST, SOAP e NPM.

Constitui em três métodos get para retornar o endereço pelo CEP informado.

Via módulo (busca-cep) do NPM.
  * get('/api/address/npm/88000000')
  
Via requisição Rest consumindo servidor VIACEP (https://viacep.com.br/)
  
  * get('/api/address/rest/88000000')

Via requisição SOAP consumindo servidor dos Correios (https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl).
  * get('/api/address/soap/88000000')

Como utilizar

  Basta clonar/baixar o código em um diretório local e executar o comando: npm install
    
  Executar o camando: node index.js
