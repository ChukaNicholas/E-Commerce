const createBid = async (req, res) => {
    const {
      session : { userId : buyerID },
      params: {listing_id} ,
      body : {
        amount,
      },
      db: {
        Listing,
        Bid
      }
    } = req
    const listingID = Number(listing_id)
    const listing = await Listing.find(listingID)
    if(!listing) return res.sendStatus(404)
    const {
      sellerID,
    } = listing
    const bid = await Bid.create(amount, sellerID, listingID, buyerID)
    res.send(bid)
  };
  
  module.exports = createBid;