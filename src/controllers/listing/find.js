const findListing = async (req, res) => {
    const { 
      params : {id},
      db: {Listing}
    } = req
    const toNum = Number(id)
    const isListing = await Listing.find(toNum)
    if(!isListing) return res.sendStatus(404)
    res.sendStatus(202)
  };
  
  module.exports = findListing;