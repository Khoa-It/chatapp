const mongoose = require('mongoose')

function configdb() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('connected mongodb cloud successful');  
    }).catch((err) => {
        console.error(err);
    });
}

module.exports = {
    configdb,
}
