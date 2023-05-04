const deleteListing = async (req, res) => {
    const {
      params : {id},
      db: {Listing},
    } = req
    const toNum = Number(id)
    const listing = await Listing.delete(toNum)
    console.log(listing)
  };
  
  module.exports = deleteListing;