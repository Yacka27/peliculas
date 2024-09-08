const mongoose = require('mongoose');

const getConection = async () =>{
    try {
        
        const url ="mongodb+srv://AdminMongoDB:basededatos@cluster0.e6rf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

        await mongoose.connect(url);
    
        console.log("conexion exitosa");

    } catch (error) {
        console.log(error);

    }

}

module.exports = {
    getConection
}
