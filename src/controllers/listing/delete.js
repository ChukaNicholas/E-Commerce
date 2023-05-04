const deleteListing = async (req, res) => {
    const {
      params : {id},
      db: {Listing},
    } = req
    const toNum = Number(id)
    const listing = await Listing.delete(toNum)
    if(!listing) return res.sendStatus(404)

    res.sendStatus(202)
  };
  
  module.exports = deleteListing;