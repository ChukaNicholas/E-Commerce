const listNotUserListing = async (req, res) => {
    const {
      session : {userId},
     db:{Listing},
    } = req
    // console.log()
    const listings = await Listing.listNotUserListings(userId)

    if (!listings) return res.sendStatus(404);
  
    res.send(listings);
  };
  
  module.exports = listNotUserListing;