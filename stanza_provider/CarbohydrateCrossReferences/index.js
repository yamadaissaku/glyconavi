'use strict';

Handlebars.registerHelper('glyconaviNothingFound', function (data) {
  console.log('data length: %s', data.length);
  return data.length === 0 ? '<p class="stanzaNothingFound">Nothing found in this entry.</p>' : '';
});

Stanza(function (stanza, params) {
  var sEndpoint = "http://rdf.glyconavi.org:8890/sparql";
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
