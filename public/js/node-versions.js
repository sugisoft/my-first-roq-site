(function () {
  var ENDPOINTS = [
    { id: "node22", url: "https://6ol38mar54.execute-api.ap-northeast-1.amazonaws.com/node22" },
    { id: "node24", url: "https://6ol38mar54.execute-api.ap-northeast-1.amazonaws.com/node24" },
    { id: "node26", url: "https://6ol38mar54.execute-api.ap-northeast-1.amazonaws.com/node26" }
  ];

  var updated = document.getElementById("node-version-updated");
  if (!document.getElementById("node-versions")) {
    return;
  }

  function setValue(id, text, failed) {
    var row = document.querySelector('[data-runtime="' + id + '"] .node-version-value');
    if (!row) {
      return;
    }
    row.textContent = text;
    row.classList.toggle("is-error", !!failed);
  }

  function load() {
    return Promise.allSettled(ENDPOINTS.map(function (endpoint) {
      return fetch(endpoint.url, { cache: "no-store" }).then(function (response) {
        if (!response.ok) {
          throw new Error(String(response.status));
        }
        return response.json();
      }).then(function (data) {
        var version = data && typeof data.version === "string" ? data.version : "";
        if (!version) {
          throw new Error("missing version");
        }
        setValue(endpoint.id, version, false);
      }).catch(function () {
        setValue(endpoint.id, "Unavailable", true);
      });
    })).then(function () {
      if (updated) {
        updated.textContent = "Last updated: " + new Date().toLocaleString();
      }
    });
  }

  load();
})();
