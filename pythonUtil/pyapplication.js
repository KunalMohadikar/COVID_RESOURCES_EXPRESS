const { spawn } = require("child_process");

module.exports = async function (){

    const ls = spawn(__dirname+"/twitter_covid_resource/twitter_covid_resource");
    dataObj = [];
    dataString = "";
    counter = 0;
    // ls.stdout.on("data", data => {
    //     console.log(`stdout: ${data}`);
    //     dataArr.push(data);
    // });

    for await (const data of ls.stdout) {
        // console.log(`number of files: ${data}`);
        dataString = dataString + `${data}`;
    };

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });

    try{
        dataString = dataString.replace(/\n/g, " ");
        console.log("Data String: "+dataString);

        dataJSON =  JSON.parse(dataString);

        dataFilter = []
        Object.keys(dataJSON.created_at).forEach(key =>{
            dataFilter.push({
                created_at: dataJSON.created_at[key],
                full_text: dataJSON.full_text[key],
                phoneNo: dataJSON.phoneNo[key]
            })
        })
    } catch(e){
        console.log(e)
        return [];
    }

    return dataFilter;
}