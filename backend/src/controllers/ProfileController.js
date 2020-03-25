const dbConnection = require('../database/connection');
module.exports = {
    //lista todos os incidentes registrados pelo perfil
    async index(request, response){
        const ong_id = request.headers.authorization;
        const incidents = await dbConnection('incidents')
            .where('ong_id', ong_id)
            .select('*');
        return response.json(incidents);
    }
};