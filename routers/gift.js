const { Router } = require('express');
const { GiftRecord } = require('../records/gift.record');

const giftRouter = Router();

giftRouter
  .get('/', async (req, res) => {
    const giftList = await GiftRecord.listAll();

    res.render('gift/list', {
      giftList,
    });
  })
  .post('/', async (req, res) => {
    const data = { // count nie jest liczbą więc to zmieniamy
      ...req.body, // kopia req.body
      count: Number(req.body.count), // podmieniamy count na liczbę
    };

    const newGift = new GiftRecord(data);
    await newGift.insert();

    res.redirect('/gift');
  });

module.exports = {
  giftRouter,
};
