/**
 * Created by franck on 19/06/15.
 */


module.exports = function(sequelize, DataTypes) {

    return sequelize.define(
        'Quiz',

        { pregunta: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "-> Falta Pregunta"}}
        },
            respuesta: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "-> Falta Respuesta"}}
            },
            tema: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> Falta Tema"}}//"Falta Tema" :default is "Otro"useless validation,
                //KEEP statement otherwise ERROR type UNDEFINED!!!
            }
        }
    );
}