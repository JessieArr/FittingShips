navigator.storage.estimate().then(function (result) {
  var message = "Using " + result.usage + " of " + result.quota + " available storage.";
  console.log(message);
});