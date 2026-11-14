const ENDPOINTS = [
  { id: "node22", url: "https://6ol38mar54.execute-api.ap-northeast-1.amazonaws.com/node22" },
  { id: "node24", url: "https://6ol38mar54.execute-api.ap-northeast-1.amazonaws.com/node24" },
  { id: "node26", url: "https://6ol38mar54.execute-api.ap-northeast-1.amazonaws.com/node26" },
  { id: "python310", url: "https://g5mkownqr8.execute-api.ap-northeast-1.amazonaws.com/python310" },
  { id: "python311", url: "https://g5mkownqr8.execute-api.ap-northeast-1.amazonaws.com/python311" },
  { id: "python312", url: "https://g5mkownqr8.execute-api.ap-northeast-1.amazonaws.com/python312" },
  { id: "python313", url: "https://g5mkownqr8.execute-api.ap-northeast-1.amazonaws.com/python313" },
  { id: "python314", url: "https://g5mkownqr8.execute-api.ap-northeast-1.amazonaws.com/python314" },
  { id: "python315", url: "https://g5mkownqr8.execute-api.ap-northeast-1.amazonaws.com/python315" },
  { id: "java8", url: "https://1y9j7bqg54.execute-api.ap-northeast-1.amazonaws.com/java8" },
  { id: "java11", url: "https://1y9j7bqg54.execute-api.ap-northeast-1.amazonaws.com/java11" },
  { id: "java17", url: "https://1y9j7bqg54.execute-api.ap-northeast-1.amazonaws.com/java17" },
  { id: "java21", url: "https://1y9j7bqg54.execute-api.ap-northeast-1.amazonaws.com/java21" },
  { id: "java25", url: "https://1y9j7bqg54.execute-api.ap-northeast-1.amazonaws.com/java25" }
];

const list = document.getElementById("runtime-versions");
if (list) {
  const updated = document.getElementById("runtime-version-updated");

  function setValue(id, text, failed) {
    const row = list.querySelector('[data-runtime="' + id + '"] .runtime-version-value');
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
