const createPurchase = async (req, res) => {
    const {
      session: { userId },
      db: { Purchase, Listing },
      params: { listing_id},
    } = req;
    const buyerID = userId
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