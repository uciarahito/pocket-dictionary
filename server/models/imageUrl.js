const axios = require('axios');

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

module.exports = (params, callback) => {
  var listFont = ['arial', 'dyslexic', 'georgia', 'impact', 'tahoma', 'trebuchet', 'verdana']
  var listColor = [
    {bg:'f27d0c',font:'ffffff'},
    {bg:'d7211a',font:'ffffff'},
    {bg:'d7211a',font:'ffffff'},
    {bg:'2e004f',font:'ffffff'},
    {bg:'002b55',font:'ffffff'},
    {bg:'005555',font:'ffffff'},
    {bg:'195953',font:'ffffff'},
    {bg:'40e0d0',font:'ffffff'},
    {bg:'ffd700',font:'000000'},
    {bg:'4b0082',font:'ffffff'},
    {bg:'b6a171',font:'ffffff'},
    {bg:'3b5998',font:'ffffff'},
    {bg:'5b005b',font:'ffffff'},
    {bg:'088da5',font:'ffffff'},
    {bg:'2a3129',font:'ffffff'},
    {bg:'e45664',font:'ffffff'},
    {bg:'ffe0ab',font:'000000'},
    {bg:'f2bab5',font:'000000'},
    {bg:'f5b9aa',font:'000000'},
    {bg:'fcccb5',font:'000000'},
    {bg:'ffc8dc',font:'000000'},
    {bg:'c39797',font:'000000'},
    {bg:'c0d6e4',font:'000000'},
    {bg:'468499',font:'ffffff'},
    {bg:'2188cd',font:'ffffff'},
    {bg:'56e4d6',font:'000000'},
    {bg:'ffc8dc',font:'000000'},
    {bg:'afeeee',font:'000000'},
    {bg:'3a329b',font:'ffffff'},
    {bg:'5d8f92',font:'ffffff'},
    {bg:'be29ec',font:'ffffff'},
    {bg:'f0d817',font:'000000'},
    {bg:'f27d0c',font:'ffffff'},
    {bg:'99d5cf',font:'000000'},
    {bg:'ffc8dc',font:'000000'},
    {bg:'e45664',font:'ffffff'},
    {bg:'4b86b4',font:'ffffff'},
    {bg:'007777',font:'ffffff'},
    {bg:'d9534f',font:'ffffff'},
    {bg:'001400',font:'ffffff'},
    {bg:'e1ede1',font:'000000'},
    {bg:'87a188',font:'ffffff'}
  ];
  var fontIndex = Math.floor(Math.random() * listFont.length);
  var colorIndex = Math.floor(Math.random() * listColor.length);
  var url = `http://api.img4me.com/?text=%20%0A%20%20%23${params.from_lang}%0A%20%20${fixedEncodeURIComponent(params.from_text)}%0A%20%0A%20%20%23${params.to_lang}%0A%20%20${fixedEncodeURIComponent(params.to_text)}%0A%20&font=${listFont[fontIndex]}&fcolor=${listColor[colorIndex].font}&size=35&bcolor=${listColor[colorIndex].bg}&type=jpg`;
  axios.get(url)
  .then(result => {
    callback(null, result.data);
  })
  .catch(err => {
    callback(err)
  })
}
