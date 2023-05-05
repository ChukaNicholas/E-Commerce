const createListing = async (req, res) => {
  const {
    session: { userId },
    db:{Listing},
    body
  } = req;
  
  const listing = await Listing.create({body, userId});
  if(!listing) return sendStatus(404)

  res.send(listing);
  };
  
  module.exports = createListing;