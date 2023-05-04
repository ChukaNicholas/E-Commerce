const deleteListing = async (req, res) => {
    const {
      params : {id},
      db: {Listing},
    } = req
    const toNum = Number(id)
    const listing = await Listing.delete(toNum)
    if(!listing) res.sendStatus(404)

    res.send(202)
  };
  
  module.exports = deleteListing;