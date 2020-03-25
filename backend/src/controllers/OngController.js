//cria uma nova ong no banco de dados
const dbConnection = require('../database/connection');
const crypto = require('crypto');
module.exports = {
    //------------------------------------------------------------------ create
    async create(request,response){
        //----------------------------------------------------- request
        const {name, email, whatsapp, city, uf} = request.body;
        //gerando id randômico com a biblioteca crypto do node
        const id = crypto.randomBytes(4).toString('HEX');
        //fazendo cadastro assíncrono no banco de dados
        await dbConnection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
        //----------------------------------------------------- response
        return response.json({ id });
    },
    //------------------------------------------------------------------ list
    async index(request, response){
        //pescando todos os registros dentro da tabela 'ongs'
        const ongsList =  await dbConnection('ongs').select('*');
        return response.json(ongsList);
    }
};