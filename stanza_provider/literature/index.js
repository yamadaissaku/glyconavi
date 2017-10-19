'use strict';

Handlebars.registerHelper('literatureNothingFound', function (data) {
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
    var categoryPubMed = {};
    var id, url;
    data.results.bindings.forEach(function (d) {
      categoryPubMed[d.from.value] = categoryPubMed[d.from.value] || [];
      id = d.pubmed_id ? d.pubmed_id.value : undefined;
      url = d.pubmed_url ? d.pubmed_url.value : undefined;
      categoryPubMed[d.from.value].push({id: id, url: url});
    });
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: categoryPubMed
      },
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
