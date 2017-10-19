'use strict';

Handlebars.registerHelper('summaryNothingFound', function (data) {
  console.log('data length: %s', data.length);
  return data.length === 0 ? '<p class="stanzaNothingFound">No data found.</p>' : '';
});

Stanza(function (stanza, params) {
  var sEndpoint = "http://test.ts.glycoinfo.org/sparql";
  console.log('endpoint: %s', sEndpoint);
  var q = stanza.query({
    endpoint: sEndpoint,
    template: "stanza.rq",
    parameters: {
      accessionNumber: params.acc
    }
  });
  console.log('accessionNumber: %s', params.acc);
  console.log('notation: %s', params.notation);

  q.done(function (data) {
    var list = data.results.bindings.map(function (d) {
      d.Mass_label.value = Math.round(10000 * parseFloat(d.Mass_label.value, 10)) / 10000;
      d.CreateDate.value = new Date(d.CreateDate.value).toUTCString();
      return d;
    });
    var now = new Date();
    list[0].date = now.toString().slice(4, 7) + '. ' + now.getDate() + ', ' + now.getFullYear();
    list[0].notation = params.notation;
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: list
      },
    });
    
    /*
    1) click "Cite this record"
    2) select the citation text
    3) click "Copy", this text is copied
     */
    stanza.select('.citation_btn').addEventListener('click', function (e) {
      e.preventDefault();
      stanza.select('.citation_content').classList.toggle('citation_content--show');
      var $target = $(stanza.select('.citation_text'));
      var range = document.createRange();
      range.selectNode($target[0]);
      window.getSelection().addRange(range);
      return false;
    });
    stanza.select('.citation_copy').addEventListener('click', function (e) {
      e.preventDefault();
      // var $target = $(stanza.select('.citation_text'));
      // var range = document.createRange();
      // range.selectNode($target[0]);
      // window.getSelection().removeAllRanges();
      // window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();

      return false;
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
