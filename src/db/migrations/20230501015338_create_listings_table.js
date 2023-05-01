/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('listings', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.integer('price').notNullable();
    table.integer('user_id').notNullable();
    table.string('description').notNullable();
    table.string('condition').notNullable();
    
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('listings');
