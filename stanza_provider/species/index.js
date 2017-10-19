'use strict';

Handlebars.registerHelper('speciesNothingFound', function (data) {
  console.log('data length: %s', data.length);
  return data.length === 0 ? '<li class="stanzaNothingFound">Nothing found in this entry.</li>' : '';
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
    var categoryTax = {};
    var name, id, url;
    data.results.bindings.forEach(function (d) {
      categoryTax[d.from.value] = categoryTax[d.from.value] || [];
      name = d.taxon_name ? d.taxon_name.value : undefined;
      id = d.taxon_id ? d.taxon_id.value : undefined;
      url = d.taxon_url ? d.taxon_url.value : undefined;
      categoryTax[d.from.value].push({name: name, id: id, url: url});
    });
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: categoryTax
      },
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
