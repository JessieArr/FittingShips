navigator.storage.estimate()
    .then((result) => {
        var message = 'Using ' + result.usage + ' of ' + result.quota + ' available storage.'
        console.log(message);
    });
