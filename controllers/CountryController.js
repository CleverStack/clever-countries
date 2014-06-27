module.exports = function ( config, Controller, CountryService ) {
    config = config[ 'clever-countries' ];

    return Controller.extend(
    {
        service: CountryService,

        listAction: function () {
            var action;

            if ( config.statesUSA && this.req.query.hasOwnProperty( 'state' ) ) {
                action = CountryService.statesList()
            } else if ( config.provincesCanada && this.req.query.hasOwnProperty( 'province' ) ) {
                action = CountryService.provincesList()
            } else {
                action = CountryService.countryList()
            }

            return action
                .then( this.proxy( 'handleServiceMessage' ) )
                .catch( this.proxy( 'handleException' ) );
        },

        postAction: function () {
            var action
              , data = this.req.body;

            if ( !!data.name ) {
                action = CountryService.findByName( data.name );
            }
            else if ( !!data.id ) {
                action = CountryService.findById( data.id );
            }
            else if ( !!data.countryCode ) {
                action = CountryService.findCountryByCode( data.countryCode );
            }
            else if ( config.statesUSA && !!data.stateCode ) {
                action = CountryService.findStateByCode( data.stateCode );
            }
            else if ( config.provincesCanada && !!data.provinceCode ) {
                action = CountryService.findProvinceByCode( data.provinceCode );
            }
            else {
                return this.send( 'Insufficient data', 400 );
            }

            return action
                .then( this.proxy( 'handleServiceMessage' ) )
                .catch( this.proxy( 'handleException' ) );
        }
    });
}