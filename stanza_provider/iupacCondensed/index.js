'use strict';

Handlebars.registerHelper('iupacCondensedNothingFound', function (data) {
  return data.length === 0 ? '<p class="stanzaNothingFound">Nothing found in this entry.</p>' : '';
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
  q.done(function (data) {
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: data.results.bindings
      },
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
