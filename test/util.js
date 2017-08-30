'use strict';

const alpha = require('../')();

test(`the url builder properly builds urls`, () => {
  expect.assertions(7);
  const frags = alpha.util
    .url('a', 'b', 'c', 'd', 'e')
    .toString()
    .split('?')[1]
    .toString()
    .split('&');

  expect(frags.length).toBe(6);
  expect(/^apikey=.*$/.test(frags[0])).toBe(true);
  expect(frags[1]).toBe('function=a');
  expect(frags[2]).toBe('symbol=b');
  expect(frags[3]).toBe('outputsize=c');
  expect(frags[4]).toBe('datatype=d');
  expect(frags[5]).toBe('interval=e');
});

test(`the url builder with no params yields the base url`, () => {
  expect.assertions(3);
  const frags = alpha.util
    .url()
    .toString()
    .split('?')[1]
    .toString()
    .split('&');

  expect(frags.length).toBe(2);
  expect(/^apikey=.*$/.test(frags[0])).toBe(true);
  expect(frags[1]).toBe('');
});

test(`intraday data polishing works`, () => {
  expect.assertions(41);
  const data = require('./examples/data/intraday');
  const polished = alpha.util.polish(data);
  let first;

  expect(data['Meta Data']).toBeDefined();
  expect(data['Meta Data']['1. Information']).toBeDefined();
  expect(data['Meta Data']['2. Symbol']).toBeDefined();
  expect(data['Meta Data']['3. Last Refreshed']).toBeDefined();
  expect(data['Meta Data']['4. Interval']).toBeDefined();
  expect(data['Meta Data']['5. Output Size']).toBeDefined();
  expect(data['Meta Data']['6. Time Zone']).toBeDefined();
  expect(data['Time Series (1min)']).toBeDefined();
  first = Object.keys(data['Time Series (1min)'])[0];
  expect(first).toBeDefined();
  expect(data['Time Series (1min)'][first]['1. open']).toBeDefined();
  expect(data['Time Series (1min)'][first]['2. high']).toBeDefined();
  expect(data['Time Series (1min)'][first]['3. low']).toBeDefined();
  expect(data['Time Series (1min)'][first]['4. close']).toBeDefined();
  expect(data['Time Series (1min)'][first]['5. volume']).toBeDefined();

  expect(polished['Meta Data']).toBeUndefined();
  expect(polished['Time Series (1min)']).toBeUndefined();
  expect(polished['meta']).toBeDefined();
  expect(polished['meta']['1. Information']).toBeUndefined();
  expect(polished['meta']['2. Symbol']).toBeUndefined();
  expect(polished['meta']['3. Last Refreshed']).toBeUndefined();
  expect(polished['meta']['4. Interval']).toBeUndefined();
  expect(polished['meta']['5. Output Size']).toBeUndefined();
  expect(polished['meta']['6. Time Zone']).toBeUndefined();
  expect(polished['meta']['information']).toBeDefined();
  expect(polished['meta']['symbol']).toBeDefined();
  expect(polished['meta']['updated']).toBeDefined();
  expect(polished['meta']['interval']).toBeDefined();
  expect(polished['meta']['size']).toBeDefined();
  expect(polished['meta']['zone']).toBeDefined();
  expect(polished['data']).toBeDefined();
  first = Object.keys(polished['data'])[0];
  expect(first).toBeDefined();
  expect(polished['data'][first]['1. open']).toBeUndefined();
  expect(polished['data'][first]['2. high']).toBeUndefined();
  expect(polished['data'][first]['3. low']).toBeUndefined();
  expect(polished['data'][first]['4. close']).toBeUndefined();
  expect(polished['data'][first]['5. volume']).toBeUndefined();
  expect(polished['data'][first]['open']).toBeDefined();
  expect(polished['data'][first]['high']).toBeDefined();
  expect(polished['data'][first]['low']).toBeDefined();
  expect(polished['data'][first]['close']).toBeDefined();
  expect(polished['data'][first]['volume']).toBeDefined();
});

test(`daily data polishing works`, () => {
  expect.assertions(38);
  const data = require('./examples/data/daily');
  const polished = alpha.util.polish(data);
  let first;

  expect(data['Meta Data']).toBeDefined();
  expect(data['Meta Data']['1. Information']).toBeDefined();
  expect(data['Meta Data']['2. Symbol']).toBeDefined();
  expect(data['Meta Data']['3. Last Refreshed']).toBeDefined();
  expect(data['Meta Data']['4. Output Size']).toBeDefined();
  expect(data['Meta Data']['5. Time Zone']).toBeDefined();
  expect(data['Time Series (Daily)']).toBeDefined();
  first = Object.keys(data['Time Series (Daily)'])[0];
  expect(first).toBeDefined();
  expect(data['Time Series (Daily)'][first]['1. open']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['2. high']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['3. low']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['4. close']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['5. volume']).toBeDefined();

  expect(polished['Meta Data']).toBeUndefined();
  expect(polished['Time Series (Daily)']).toBeUndefined();
  expect(polished['meta']).toBeDefined();
  expect(polished['meta']['1. Information']).toBeUndefined();
  expect(polished['meta']['2. Symbol']).toBeUndefined();
  expect(polished['meta']['3. Last Refreshed']).toBeUndefined();
  expect(polished['meta']['4. Output Size']).toBeUndefined();
  expect(polished['meta']['5. Time Zone']).toBeUndefined();
  expect(polished['meta']['information']).toBeDefined();
  expect(polished['meta']['symbol']).toBeDefined();
  expect(polished['meta']['updated']).toBeDefined();
  expect(polished['meta']['size']).toBeDefined();
  expect(polished['meta']['zone']).toBeDefined();
  expect(polished['data']).toBeDefined();
  first = Object.keys(polished['data'])[0];
  expect(first).toBeDefined();
  expect(polished['data'][first]['1. open']).toBeUndefined();
  expect(polished['data'][first]['2. high']).toBeUndefined();
  expect(polished['data'][first]['3. low']).toBeUndefined();
  expect(polished['data'][first]['4. close']).toBeUndefined();
  expect(polished['data'][first]['5. volume']).toBeUndefined();
  expect(polished['data'][first]['open']).toBeDefined();
  expect(polished['data'][first]['high']).toBeDefined();
  expect(polished['data'][first]['low']).toBeDefined();
  expect(polished['data'][first]['close']).toBeDefined();
  expect(polished['data'][first]['volume']).toBeDefined();
});

test(`adjusted data polishing works`, () => {
  expect.assertions(47);
  const data = require('./examples/data/adjusted');
  const polished = alpha.util.polish(data);
  let first;

  expect(data['Meta Data']).toBeDefined();
  expect(data['Meta Data']['1. Information']).toBeDefined();
  expect(data['Meta Data']['2. Symbol']).toBeDefined();
  expect(data['Meta Data']['3. Last Refreshed']).toBeDefined();
  expect(data['Meta Data']['4. Output Size']).toBeDefined();
  expect(data['Meta Data']['5. Time Zone']).toBeDefined();
  expect(data['Time Series (Daily)']).toBeDefined();
  first = Object.keys(data['Time Series (Daily)'])[0];
  expect(first).toBeDefined();
  expect(data['Time Series (Daily)'][first]['1. open']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['2. high']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['3. low']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['4. close']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['5. adjusted close']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['6. volume']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['7. dividend amount']).toBeDefined();
  expect(data['Time Series (Daily)'][first]['8. split coefficient']).toBeDefined();

  expect(polished['Meta Data']).toBeUndefined();
  expect(polished['Time Series (Daily)']).toBeUndefined();
  expect(polished['meta']).toBeDefined();
  expect(polished['meta']['1. Information']).toBeUndefined();
  expect(polished['meta']['2. Symbol']).toBeUndefined();
  expect(polished['meta']['3. Last Refreshed']).toBeUndefined();
  expect(polished['meta']['4. Output Size']).toBeUndefined();
  expect(polished['meta']['5. Time Zone']).toBeUndefined();
  expect(polished['meta']['information']).toBeDefined();
  expect(polished['meta']['symbol']).toBeDefined();
  expect(polished['meta']['updated']).toBeDefined();
  expect(polished['meta']['size']).toBeDefined();
  expect(polished['meta']['zone']).toBeDefined();
  expect(polished['data']).toBeDefined();
  first = Object.keys(polished['data'])[0];
  expect(first).toBeDefined();
  expect(polished['data'][first]['1. open']).toBeUndefined();
  expect(polished['data'][first]['2. high']).toBeUndefined();
  expect(polished['data'][first]['3. low']).toBeUndefined();
  expect(polished['data'][first]['4. close']).toBeUndefined();
  expect(polished['data'][first]['5. adjusted close']).toBeUndefined();
  expect(polished['data'][first]['6. volume']).toBeUndefined();
  expect(polished['data'][first]['7. dividend amount']).toBeUndefined();
  expect(polished['data'][first]['8. split coefficient']).toBeUndefined();
  expect(polished['data'][first]['open']).toBeDefined();
  expect(polished['data'][first]['high']).toBeDefined();
  expect(polished['data'][first]['low']).toBeDefined();
  expect(polished['data'][first]['close']).toBeDefined();
  expect(polished['data'][first]['adjusted']).toBeDefined();
  expect(polished['data'][first]['volume']).toBeDefined();
  expect(polished['data'][first]['dividend']).toBeDefined();
  expect(polished['data'][first]['split']).toBeDefined();
});

test(`weekly data polishing works`, () => {
  expect.assertions(35);
  const data = require('./examples/data/weekly');
  const polished = alpha.util.polish(data);
  let first;

  expect(data['Meta Data']).toBeDefined();
  expect(data['Meta Data']['1. Information']).toBeDefined();
  expect(data['Meta Data']['2. Symbol']).toBeDefined();
  expect(data['Meta Data']['3. Last Refreshed']).toBeDefined();
  expect(data['Meta Data']['4. Time Zone']).toBeDefined();
  expect(data['Weekly Time Series']).toBeDefined();
  first = Object.keys(data['Weekly Time Series'])[0];
  expect(first).toBeDefined();
  expect(data['Weekly Time Series'][first]['1. open']).toBeDefined();
  expect(data['Weekly Time Series'][first]['2. high']).toBeDefined();
  expect(data['Weekly Time Series'][first]['3. low']).toBeDefined();
  expect(data['Weekly Time Series'][first]['4. close']).toBeDefined();
  expect(data['Weekly Time Series'][first]['5. volume']).toBeDefined();

  expect(polished['Meta Data']).toBeUndefined();
  expect(polished['Weekly Time Series']).toBeUndefined();
  expect(polished['meta']).toBeDefined();
  expect(polished['meta']['1. Information']).toBeUndefined();
  expect(polished['meta']['2. Symbol']).toBeUndefined();
  expect(polished['meta']['3. Last Refreshed']).toBeUndefined();
  expect(polished['meta']['4. Time Zone']).toBeUndefined();
  expect(polished['meta']['information']).toBeDefined();
  expect(polished['meta']['symbol']).toBeDefined();
  expect(polished['meta']['updated']).toBeDefined();
  expect(polished['meta']['zone']).toBeDefined();
  expect(polished['data']).toBeDefined();
  first = Object.keys(polished['data'])[0];
  expect(first).toBeDefined();
  expect(polished['data'][first]['1. open']).toBeUndefined();
  expect(polished['data'][first]['2. high']).toBeUndefined();
  expect(polished['data'][first]['3. low']).toBeUndefined();
  expect(polished['data'][first]['4. close']).toBeUndefined();
  expect(polished['data'][first]['5. volume']).toBeUndefined();
  expect(polished['data'][first]['open']).toBeDefined();
  expect(polished['data'][first]['high']).toBeDefined();
  expect(polished['data'][first]['low']).toBeDefined();
  expect(polished['data'][first]['close']).toBeDefined();
  expect(polished['data'][first]['volume']).toBeDefined();
});

test(`monthly data polishing works`, () => {
  expect.assertions(35);
  const data = require('./examples/data/monthly');
  const polished = alpha.util.polish(data);
  let first;

  expect(data['Meta Data']).toBeDefined();
  expect(data['Meta Data']['1. Information']).toBeDefined();
  expect(data['Meta Data']['2. Symbol']).toBeDefined();
  expect(data['Meta Data']['3. Last Refreshed']).toBeDefined();
  expect(data['Meta Data']['4. Time Zone']).toBeDefined();
  expect(data['Monthly Time Series']).toBeDefined();
  first = Object.keys(data['Monthly Time Series'])[0];
  expect(first).toBeDefined();
  expect(data['Monthly Time Series'][first]['1. open']).toBeDefined();
  expect(data['Monthly Time Series'][first]['2. high']).toBeDefined();
  expect(data['Monthly Time Series'][first]['3. low']).toBeDefined();
  expect(data['Monthly Time Series'][first]['4. close']).toBeDefined();
  expect(data['Monthly Time Series'][first]['5. volume']).toBeDefined();

  expect(polished['Meta Data']).toBeUndefined();
  expect(polished['Monthly Time Series']).toBeUndefined();
  expect(polished['meta']).toBeDefined();
  expect(polished['meta']['1. Information']).toBeUndefined();
  expect(polished['meta']['2. Symbol']).toBeUndefined();
  expect(polished['meta']['3. Last Refreshed']).toBeUndefined();
  expect(polished['meta']['4. Time Zone']).toBeUndefined();
  expect(polished['meta']['information']).toBeDefined();
  expect(polished['meta']['symbol']).toBeDefined();
  expect(polished['meta']['updated']).toBeDefined();
  expect(polished['meta']['zone']).toBeDefined();
  expect(polished['data']).toBeDefined();
  first = Object.keys(polished['data'])[0];
  expect(first).toBeDefined();
  expect(polished['data'][first]['1. open']).toBeUndefined();
  expect(polished['data'][first]['2. high']).toBeUndefined();
  expect(polished['data'][first]['3. low']).toBeUndefined();
  expect(polished['data'][first]['4. close']).toBeUndefined();
  expect(polished['data'][first]['5. volume']).toBeUndefined();
  expect(polished['data'][first]['open']).toBeDefined();
  expect(polished['data'][first]['high']).toBeDefined();
  expect(polished['data'][first]['low']).toBeDefined();
  expect(polished['data'][first]['close']).toBeDefined();
  expect(polished['data'][first]['volume']).toBeDefined();
});

test(`sector performance data polishing works`, () => {
  expect.assertions(48);
  const data = require('./examples/sector/performance');
  const polished = alpha.util.polish(data);

  expect(data['Meta Data']).toBeDefined();
  expect(data['Meta Data']['Information']).toBeDefined();
  expect(data['Meta Data']['Last Refreshed']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']).toBeDefined();
  expect(data['Rank B: 1 Day Performance']).toBeDefined();
  expect(data['Rank C: 5 Day Performance']).toBeDefined();
  expect(data['Rank D: 1 Month Performance']).toBeDefined();
  expect(data['Rank E: 3 Month Performance']).toBeDefined();
  expect(data['Rank F: Year-to-Date (YTD) Performance']).toBeDefined();
  expect(data['Rank G: 1 Year Performance']).toBeDefined();
  expect(data['Rank H: 3 Year Performance']).toBeDefined();
  expect(data['Rank I: 5 Year Performance']).toBeDefined();
  expect(data['Rank J: 10 Year Performance']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Information Technology']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Consumer Discretionary']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Health Care']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Industrials']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Consumer Staples']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Telecommunication Services']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Materials']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Financials']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Real Estate']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Utilities']).toBeDefined();
  expect(data['Rank A: Real-Time Performance']['Energy']).toBeDefined();

  expect(polished['Meta Data']).toBeUndefined();
  expect(polished['Rank A: Real-Time Performance']).toBeUndefined();
  expect(polished['Rank B: 1 Day Performance']).toBeUndefined();
  expect(polished['Rank C: 5 Day Performance']).toBeUndefined();
  expect(polished['Rank D: 1 Month Performance']).toBeUndefined();
  expect(polished['Rank E: 3 Month Performance']).toBeUndefined();
  expect(polished['Rank F: Year-to-Date (YTD) Performance']).toBeUndefined();
  expect(polished['Rank G: 1 Year Performance']).toBeUndefined();
  expect(polished['Rank H: 3 Year Performance']).toBeUndefined();
  expect(polished['Rank I: 5 Year Performance']).toBeUndefined();
  expect(polished['Rank J: 10 Year Performance']).toBeUndefined();

  expect(polished['meta']).toBeDefined();
  expect(polished['meta']['information']).toBeDefined();
  expect(polished['meta']['updated']).toBeDefined();
  expect(polished['real']).toBeDefined();
  expect(polished['1day']).toBeDefined();
  expect(polished['5day']).toBeDefined();
  expect(polished['1month']).toBeDefined();
  expect(polished['3month']).toBeDefined();
  expect(polished['ytd']).toBeDefined();
  expect(polished['1year']).toBeDefined();
  expect(polished['3year']).toBeDefined();
  expect(polished['5year']).toBeDefined();
  expect(polished['10year']).toBeDefined();
});
