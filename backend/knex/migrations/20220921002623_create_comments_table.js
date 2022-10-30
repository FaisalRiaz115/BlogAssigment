
exports.up = function(knex) {
    return knex.schema
        .createTable('comments', function (table) {
            table.increments('comment_id').primary();
            table.string('comment_message').notNullable();
            table.dateTime('comment_date').notNullable();
            table.integer('user_id').unsigned().references('id').inTable('users');
        });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('comments');
};
