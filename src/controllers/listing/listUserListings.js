const listUserListing = async (req, res) => {
  const {
    session: { userId },
   db:{Listing},
  } = req

  const listings = await Listing.listUserListings(userId)

  if (!listings) return res.sendStatus(404);

  res.send(listings);
  };
  
  module.exports = listUserListing;