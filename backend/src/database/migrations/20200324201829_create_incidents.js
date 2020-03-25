
exports.up = function(knex) {
    return knex.schema.createTable('incidents', table=>{
        table.increments();//primary key, nunca id repetido

        table.string('title').notNullable();//titulo do incidente
        table.string('description').notNullable();
        table.decimal('value').notNullable();//dinheiro para resolver incidente

        table.string('ong_id').notNullable();
        //chave estrangeira, garantindo existência da id no banco de dados
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
