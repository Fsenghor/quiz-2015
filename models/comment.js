/**
 * Created by franck on 24/06/15.
 */
//define   the comments table format
module.exports = function(sequelize, DataTypes) {
        return sequelize.define(
            'Comment',
            { texto: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "-> Falta Comentario"}}
                      },
                  publicado: {
                  	type: DataTypes.BOOLEAN,
                      	defaultValue: false
                             }

            }
        );
}