var zookeeper = require('../index.js');

var client = zookeeper.createClient(
    process.argv[2] || 'localhost:2181',
    {
        timeout : 30000,
        spinDelay : 1000
    }
);

var path = process.argv[3];

client.on('state', function (state) {
    if (state === 2) {
        console.log('Connected to the server.');
        client.getChildren(path, function (error, children, stat) {
            if (error) {
                console.log('Got error when listing children: ' + error);
                return;
            }

            console.log('Children of %s: %j', path, children);
        });
    }
});

client.on('error', function (error) {
    console.log('Got error: ' + error);
});


client.connect();
