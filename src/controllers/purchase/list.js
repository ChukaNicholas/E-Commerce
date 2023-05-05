const listPurchases = async (req, res) => {
    
    const {
      db: { Purchase },
      params: { id },
    } = req;
  
    const purchases = await Purchase.list(Number(id));
    if(!purchases) return res.sendStatus(404);
  
    res.send(purchases);
  };
  
  module.exports = listPurchases;