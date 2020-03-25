const dbConnection = require('../database/connection');

module.exports = {
    //criando novo incidente
    async create(request, response){
        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        //atribui um id de acordo com posição no array - ??
        const [id] = await dbConnection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },
    async index(request, response){
        //sistema de paginação por query (?page=0)
        const {page = 1} = request.query;

        const [contadorDeCasos] = await dbConnection('incidents').count();
       // console.log(contadorDeCasos); // imprime { 'count(*)': 17 }

        const incidents = await dbConnection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//mesclando tabels SQL
            .limit(5)//limite de 5 casos por página
            .offset((page-1)*5)//pula 5 no array
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);//incidentes juntos com os dados da ong
        
        //retornando pelo cabeçalho
        response.header("X-Total-Count", contadorDeCasos['count(*)']);
        
        return response.json(incidents);
    },
    //deletes an incident
    async delete(request, response){
        const {id} = request.params;//request route params
        const logged_ong_id = request.headers.authorization;
        //buscando incidente no banco de dados
        const incident = await dbConnection('incidents')
            .where('id', id)//campo  'id' == variavel id
            .select('ong_id')//somente coluna ong_id da tabela incidents
            .first();//retorna apenas um resultado, para otimização
        if (incident.ong_id !==logged_ong_id ){
            //erro http não autorizado
            return response.status(401).json({error:"operation not permitted."});
        }
        //passou sem erros, então:
        await dbConnection('incidents').where('id',id).delete();
        return response.status(204).send();
    }
};