//up cria tabelas
exports.up = function(knex) {
    return knex.schema.createTable('ongs', table=>{
        table.string('id').primary();//id da ONG
        table.string('name').notNullable();//nome da ONG
        table.string('email').notNullable();//email da ONG
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();//estado da ong, 2 caracteres 
    });
};
//down desfaz tabela
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};


