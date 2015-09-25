/*global module */
/*global process */
/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

var generators = require( 'yeoman-generator' );

module.exports = generators.Base.extend( {

   constructor: function() {
      'use strict';
      generators.Base.apply( this, arguments );
      this.argument( 'name', {
         type: String,
         required: false,
         desc: 'Name of the artifact'
      } );
      this.option( 'directory', {
         type: String,
         defaults: '',
         desc: 'Base directory for activities'
      } );
   },

   prompting: function() {
      'use strict';
      var options = {
         options: {
            activity: true,
            directory:  this.options.directory
         }
      };
      if( this.name ) {
         options.args = [ this.name ];
      }
      this.composeWith( 'laxarjs:widget', options,
         {
            local: require.resolve( '../widget' )
         } );
   }

} );

