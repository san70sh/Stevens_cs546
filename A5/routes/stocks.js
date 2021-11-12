const express = require('express');
const router = express.Router();
const data = require('../data');
const stockDat = data.stocks;

router.get('/', async (req, res) => {
  try {
    const stockList = await stockDat.getStock();
    res.json(stockList);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
    try {
        reqId = req.params.id.trim();
        let re = /^[A-Za-z0-9-]+$/;
        if(re.test(reqId)){
            const stk = await stockDat.getStockById(req.params.id);
            res.json(stk);
        } else {
            res.status(404).json({message: 'Please enter a valid ID'})
        }
    } catch (e) {
      res.status(404).json({ message: 'This stock is not present in the list.' });
    }
  });
  
router.post('/', async (req, res) => {
  res.status(501).send();
});

router.delete('/', async (req, res) => {
  res.status(501).send();
});

module.exports = router;
