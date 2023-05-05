const findListing = async (req, res) => {
    const { 
      params : {listing_id},
      db: {Listing}
    } = req
    const toNum = Number(listing_id)
    const listing = await Listing.find(toNum)
    if(!listing) return res.sendStatus(404)
    res.send(listing)
  };
  
  module.exports = findListing;