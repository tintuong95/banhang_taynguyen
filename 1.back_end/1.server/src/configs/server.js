const sequelize = require("./sequelize.js");

function startServer(server) {

    server.listen(process.env.PORT || 3000, async() => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        console.log('Connect success', process.env.PORT || 3000)
    })
}

module.exports = startServer