(function () {
  function createEventDataScript(jsonText) {
    var oldScript = document.getElementById('script_event_data');
    if (oldScript && oldScript.parentNode) {
      oldScript.parentNode.removeChild(oldScript);
    }

    var script = document.createElement('script');
    script.id = 'script_event_data';
    script.type = 'application/json';
    script.text = jsonText;

    var currentScript = document.currentScript || document.querySelector('script[src="data/load-event-data.js"]');
    if (currentScript && currentScript.parentNode) {
      currentScript.parentNode.insertBefore(script, currentScript.nextSibling);
    } else {
      document.head.appendChild(script);
    }
  }

  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/event-data.json?v=1773670799190', false);
    xhr.overrideMimeType && xhr.overrideMimeType('application/json');
    xhr.send(null);

    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
      JSON.parse(xhr.responseText);
      createEventDataScript(xhr.responseText);
    } else {
      throw new Error('HTTP ' + xhr.status + ' while loading data/event-data.json');
    }
  } catch (error) {
    console.error('Cannot load LadiPage event data from data/event-data.json:', error);
  }
})();
