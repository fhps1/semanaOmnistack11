const dbConnection = require('../database/connection');
module.exports = {
    //verifica se a ong existe para criar sessão
    async create(request, response){
        const {id} = request.body;
        const ong = await dbConnection('ongs')
            .where('id', id)
            .select('name')
            .first();
        if (!ong){
            return response.status(400).json({error:'No ONG found with this id'});
        }

        return response.json(ong);
    }
}