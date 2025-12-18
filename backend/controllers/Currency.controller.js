const axios = require('axios');
const { fetchNBP } = require('../utils/nbp');

exports.getCurrentCurrency = async (req, res) => {
  const currencies = ['USD', 'EUR', 'CHF'];
  const result = [];

  for (const cur of currencies) {
    const rate = await fetchNBP('A', cur);
    if (rate)
      result.push({ code: cur, mid: rate.mid, date: rate.effectiveDate });
  }
  res.json(result);
};

exports.getOldCurrency = async (req, res) => {
  const { currency, start, end } = req.params;

  try {
    const url = `http://api.nbp.pl/api/exchangerates/rates/A/${currency}/${start}/${end}/`;
    const { data } = await axios.get(url, {
      headers: { Accept: 'application/json' },
    });
    res.json(data.rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
