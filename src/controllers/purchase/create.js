const createPurchase = async (req, res) => {
    const {
      params: { id },
      db: { Purchase, Listing },
      body: { listing_id},
    } = req;
    const buyerID = Number(id)
    const listingID = Number(listing_id)
    const listing = await Listing.find(listingID);
    if(!listing) return res.sendStatus(404)
    const {
      price,
      image,
      sellerID
    } = listing
    const purchase = await Purchase.create(price, sellerID, listingID, buyerID, image)
    res.send(purchase)
  };
  
  module.exports = createPurchase;