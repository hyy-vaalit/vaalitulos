// Returns query string parameters from given URL.
// getUrlParameterByName("json") will return "xyz.json"
// for URL http://example.com/index.html?json=xyz.json
function getUrlParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Returns json file from URL query string parameters.
// If URL does not contain a parameter, returns the supplied default value.
function discoverJsonUrl(defaultPath) {
  jsonPath = getUrlParameterByName("json");
  return jsonPath != ""
    ? jsonPath
    : defaultPath;
}

function loadResultData(resultPath, chartCallback, errorCallback) {
  $.ajax({
    url: resultPath,
    dataType: 'json',
    success: function(jsonData) {
      chartCallback(jsonData);
    },
    error: function(e) {
      errorCallback(e);
    }
  });
}

function displayChartLoadError(e) {
  $('#chart').append('Vaalitulosta ei ole vielä julkaistu (lataus epäonnistui).');
}

function displayBetterChartLoadError() {
  $('#error').append('Vaalitulosta ei ole vielä julkaistu (lataus epäonnistui).');
}

function addChartLabels(chartLabelElement, results) {
  for (var i=0; i<results.length; i++) {
    var labelTag = '<li>'+  results[i][0] +": " + results[i][1] +'</li>';
    $(chartLabelElement).append(labelTag);
  }
}

function helsinkiDateTime(dateStr) {
  return new Date(dateStr).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' });
}
