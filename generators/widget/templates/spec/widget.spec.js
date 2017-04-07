<%- banner %>
define( [
   'json!../widget.json',
   'laxar-mocks'
], function( descriptor, axMocks ) {
   'use strict';

   // Minimalistic test setup. More information:
   // https://laxarjs.org/docs/laxar-mocks-v1-latest/manuals/

   describe( 'The <%= name %>', function() {

      beforeEach( axMocks.createSetupForWidget( descriptor, {
         knownMissingResources: []
      } ) );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      beforeEach( function() {
         axMocks.widget.configure( {} );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      beforeEach( axMocks.widget.load );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'still needs some tests', function() {
         // ... first test here
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      afterEach( axMocks.tearDown );

   } );

} );
