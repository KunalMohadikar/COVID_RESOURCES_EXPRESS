const { spawn } = require("child_process");
const tweetSchema = require('../models/tweet');

module.exports = async function (){

    console.log("started");
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
        console.log("ok");

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

    if(dataFilter.length != 0){
        console.log("db operations");
        try{
            await tweetSchema.deleteMany({});
            tweetSchema_doc = await tweetSchema.create(dataFilter);
            console.log("tweetSchema_doc: ");
            console.log(tweetSchema_doc);
        } catch(e){
            console.log("error: " + e);
        }
    }

    return dataFilter;
}