var PythonShell = require('python-shell');
exports.exampleRun = async function (){

    data = {};

    const { success, err = '' } = await new Promise((resolve, reject) => {
        // var myPythonScriptPath = __dirname+'/script.py';
        var myPythonScriptPath = __dirname+'/sentimentAnalysis.py';
    
        var pyshell = new PythonShell.PythonShell(myPythonScriptPath);
        console.log(__dirname)
        counter = 0;
        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            // console.log(message);
            data[counter] = message;
            counter++;
        });

        // end the input stream and allow the process to exit
        pyshell.end(function (err) {
            if (err){
                reject({ success: false, err });
            };
            // console.log('finished');
            resolve({ success: true, data });
        });
    });

    console.log(data);
    return data;
}
