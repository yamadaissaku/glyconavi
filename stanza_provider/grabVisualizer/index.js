'use strict';

Stanza(function(stanza, params) {
  stanza.render({
    template: "stanza.html",
    parameters: {
      acc: params.acc,
    }
  });
});
