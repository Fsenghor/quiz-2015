/**
 * Created by franck on 19/06/15.
 */


module.exports = function(sequelize, DataTypes) {

    return sequelize.define('Quiz',
        {
            pregunta: DataTypes.STRING,
            respuesta: DataTypes.STRING
        });
}