/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw(`
    TRUNCATE TABLE bids;
    INSERT INTO bids (amount, seller_id, listing_id, buyer_id)
    VALUES (24.99, 4, 4, 2);
  `)
};
