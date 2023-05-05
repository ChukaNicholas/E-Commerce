const listUserListing = async (req, res) => {
  const {
    params:{id},
   db:{Listing},
  } = req

  const listings = await Listing.listUserListings(Number(id))
  console.log(listings)
  if (!listings) return res.sendStatus(404);

  res.send(listings);
  };
  
  module.exports = listUserListing;