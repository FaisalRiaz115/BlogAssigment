
exports.up = function(knex) {
    return knex.schema
        .createTable('posts', function (table) {
            table.increments('post_id').primary();
            table.string('post_title', 255).notNullable();
            table.string('post_description').notNullable();
            table.dateTime('post_date').notNullable();
            table.integer('user_id').unsigned().references('id').inTable('users');
        });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('posts');
};
