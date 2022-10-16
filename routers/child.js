const { Router } = require('express');
const { ChildRecord } = require('../records/child.record');
const { GiftRecord } = require('../records/gift.record');
const { ValidationError } = require('../utils/error');

const childRouter = Router();

childRouter
  .get('/', async (req, res) => {
    const childrenList = await ChildRecord.listAll();
    const giftsList = await GiftRecord.listAll();
    res.render('children/list', {
      childrenList,
      giftsList,
    });
  })
  .post('/', async (req, res) => {
    console.log(req.body);
    const newChild = new ChildRecord(req.body);
    await newChild.insert();

    res.redirect('/child');
  })
  .patch('/gift/:childId', async (req, res) => {
    const child = await ChildRecord.getOne(req.params.childId);

    if (child === null) {
      throw new ValidationError('Nie znaleziono dziecka z podanym ID');
    }

    const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId);

    if (gift.count <= await gift.countGivenGifts()) {
      throw new ValidationError('Za mało preznetów tego typu na stanie');
    }

    child.giftId = gift.id ?? null;
    await child.update();

    res.redirect('/child');
  });

module.exports = {
  childRouter,
};
