const listNotUserListing = async (req, res) => {
    const {
      session: { userID },
      params:{id},
     db:{Listing},
    } = req
    console.log(userID)
    // const listings = await Listing.listNotUserListings(userID)
    // console.log(listings)
    // if (!listings) return res.sendStatus(404);
  
    // res.send(listings);
  };
  
  module.exports = listNotUserListing;