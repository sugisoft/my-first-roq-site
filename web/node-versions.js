const ENDPOINTS = [
  { id: "node22", url: "https://6ol38mar54.execute-api.ap-northeast-1.amazonaws.com/node22" },
  { id: "node24", url: "https://6ol38mar54.execute-api.ap-northeast-1.amazonaws.com/node24" },
  { id: "node26", url: "https://6ol38mar54.execute-api.ap-northeast-1.amazonaws.com/node26" }
];

const list = document.getElementById("node-versions");
if (list) {
  const updated = document.getElementById("node-version-updated");

  function setValue(id, text, failed) {
    const row = list.querySelector('[data-runtime="' + id + '"] .node-version-value');
    if (!row) {
      return;
    }
    row.textContent = text;
    row.classList.toggle("is-error", !!failed);
  }

  Promise.allSettled(ENDPOINTS.map(function (endpoint) {
    return fetch(endpoint.url, { cache: "no-store" }).then(function (response) {
      if (!response.ok) {
        throw new Error(String(response.status));
      }
      return response.json();
    }).then(function (data) {
      const version = data && typeof data.version === "string" ? data.version : "";
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
