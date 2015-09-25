<%- banner %>
define( [
   'json!../widget.json',
   '../<%= name %>',
   'laxar/laxar_testing'
], function( descriptor, widgetModule, ax ) {
   'use strict';

   describe( '<%= name %>', function() {

      var testBed;

      beforeEach( function setup() {
         testBed = ax.testing.portalMocksAngular.createControllerTestBed( descriptor );
         testBed.featuresMock = {};
         testBed.setup();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      afterEach( function() {
         testBed.tearDown();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'still needs some tests.' );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

   } );

} );
