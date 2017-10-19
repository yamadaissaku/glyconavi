'use strict';

Handlebars.registerHelper('externalNothingFound', function (data) {
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
    var categoryExternal = {};
    var list, label, id, url;
    data.results.bindings.forEach(function (d) {
      categoryExternal[d.entry_label.value] = categoryExternal[d.entry_label.value] || {list: [], label: ''};
      label = d.entry_label ? d.entry_label.value : undefined;
      id = d.external_id ? d.external_id.value : undefined;
      url = d.url ? d.url.value : undefined;
      from = d.from ? d.from.value : undefined;
      categoryExternal[d.entry_label.value].label = categoryExternal[d.entry_label.value].label || label;
      categoryExternal[d.entry_label.value].from = categoryExternal[d.entry_label.value].from || from;
      categoryExternal[d.entry_label.value].list.push({id: id, url: url});
    });
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: categoryExternal
      },
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
