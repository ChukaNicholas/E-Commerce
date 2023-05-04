const createListing = async (req, res) => {
  const {
    params: {id},
    db:{Listing},
    body
  } = req;
  
  const toNum = Number(id)
  const listing = await Listing.create({body, toNum});
  // console.log(listing)

  res.send(listing);
  };
  
  module.exports = createListing;