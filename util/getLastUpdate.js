const { listenerCount } = require('../models/lastupdate');
const LastUpdate = require('../models/lastupdate');

module.exports = async function(){
    lastUpdate = await LastUpdate.find();

    if(lastUpdate!=null && lastUpdate.length!=0){
        return lastUpdate[0];
    }
    return null;
}