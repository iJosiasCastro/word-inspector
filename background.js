(function () {
  window.initBackgroundPageAsync = function (a) {
    gapi.config.update(
      "googleapis.config/root",
      "https://dictionaryextension-pa.googleapis.com"
    );
    gapi.client.setApiKey("AIzaSyA6EEtrDCfBkHV8uU2lgGY-N383ZgAOo7Y");
  };
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "fetch_raw") {
      const selectedWord = message.query;
  
      let params = {
        path: "v1/dictionaryExtensionData",
        params: { term: selectedWord, language: 'en', corpus: 'en-US' },
      };
  
      gapi.client.request(params)
        .then((res) => {
          sendResponse(res.result.dictionaryData);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          sendResponse({ error: "An error occurred during the fetch" });
        });
  
      return true;
    }
  });
})();
