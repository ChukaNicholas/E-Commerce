/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex.raw(`
    TRUNCATE TABLE listings;
    INSERT INTO listings (name, image, price, seller_id, description, condition, up_for_auction)
    VALUES ('Clarinet', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F11%2F29%2F17%2F14%2Fclarinet-1870572__340.png&tbnid=BA0O40lQ3o2cMM&vet=12ahUKEwiu09r78tb-AhXFVDUKHaDuAxoQMygPegUIARD8Ag..i&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fclarinet%2F&docid=9sO2bvakqNYf3M&w=594&h=340&q=clarinet%20instrument&ved=2ahUKEwiu09r78tb-AhXFVDUKHaDuAxoQMygPegUIARD8Ag', 5.99, 1, 'A state of the art clarinet, passed down from generation to generation', 'used', FALSE);

    INSERT INTO listings (name, image, price, seller_id, description, condition, up_for_auction)
    VALUES ('Sneaker', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.vogue.fr%2Fphotos%2F5d40515bc93b83000833392f%2F16%3A9%2Fw_1280%2Cc_limit%2F020-Sneakers-Encyclopaedia-Vogueint-Jul24-Getty-Images.jpg&tbnid=fES4Eo5ExBOPAM&vet=12ahUKEwia_6Dq9Nb-AhWbEGIAHRxLCq0QMygTegUIARCOBA..i&imgrefurl=https%3A%2F%2Fwww.vogue.fr%2Ffashion%2Farticle%2Fvogues-fashion-encyclopedia-the-history-of-sneakers&docid=h4sD0Ppff4MAhM&w=1280&h=720&q=sneakers&ved=2ahUKEwia_6Dq9Nb-AhWbEGIAHRxLCq0QMygTegUIARCOBA', 10.99, 3, 'A running sneaker', 'good', FALSE);

    INSERT INTO listings (name, image, price, seller_id, description, condition, up_for_auction)
    VALUES ('Bulldozer', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fgray-kfyr-prod.cdn.arcpublishing.com%2Fresizer%2FPZG_hZPxy0K4Kje0rreuTKmFeh4%3D%2F1200x675%2Fsmart%2Ffilters%3Aquality(85)%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fgray%2FW5PTHGIILJFNZMYHMCMJGSXOJM.png&tbnid=tK4XPS937kdjoM&vet=12ahUKEwjkkLGH9db-AhVKJGIAHWmPCDsQMygLegUIARDeAg..i&imgrefurl=https%3A%2F%2Fwww.kfyrtv.com%2F2022%2F01%2F28%2F7-year-old-killed-by-bulldozer-his-father-was-driving%2F&docid=zX8pP68kemgwDM&w=1200&h=675&q=bulldozer&ved=2ahUKEwjkkLGH9db-AhVKJGIAHWmPCDsQMygLegUIARDeAg', 7.99, 2, 'A bulldozer, you just need to replace the battery', 'good', FALSE);

    INSERT INTO listings (name, image, price, seller_id, description, condition, up_for_auction)
    VALUES ('Computer', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F77%2F170477-050-1C747EE3%2FLaptop-computer.jpg&tbnid=_bAxRLesPf9HpM&vet=12ahUKEwiLloyp-Nb-AhV5GVkFHU59Cw0QMygBegUIARDEAg..i&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Ftechnology%2Fcomputer&docid=9oCv57c03X8yLM&w=1600&h=1097&q=Computer&ved=2ahUKEwiLloyp-Nb-AhV5GVkFHU59Cw0QMygBegUIARDEAg', 24.99, 4, 'A computer with beans inside of it', 'bean', TRUE);
  `)
};
