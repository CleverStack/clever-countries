module.exports = function ( config, Model ) {
    return Model.extend( 'Country', {
        type: config[ 'clever-countries' ].driver
    },
    {
        id: {
            type: Number,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: String,
            allowNull: false
        },
        name: {
            type: String,
            allowNull: false,
            unique: true
        },
        code: {
            type: String,
            allowNull: false
        }
    });
}