const listPurchases = async (req, res) => {
    
    const {
      session: { userId },
      db: { Purchase },
    } = req;
  
    const purchases = await Purchase.list(userId);
    if(!purchases) return res.sendStatus(404);
  
    res.send(purchases);
  };
  
  module.exports = listPurchases;