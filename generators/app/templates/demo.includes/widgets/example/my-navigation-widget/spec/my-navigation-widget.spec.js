<%- banner %>
define( [
   'json!../widget.json',
   'laxar-mocks',
   'angular-mocks'
], function( descriptor, axMocks, ngMocks ) {
   'use strict';

   // More information on widget tests:
   // https://laxarjs.org/docs/laxar-mocks-v1-latest/manuals/
   describe( 'The MyNavigationWidget', function() {

      beforeEach( axMocks.createSetupForWidget( descriptor, {
         knownMissingResources: [ 'default.theme/css/my-navigation-widget.css' ]
      } ) );
      afterEach( axMocks.tearDown );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'with links', function() {

         var constructAnchor_;

         beforeEach( function() {
            axMocks.widget.configure( {
               links: [ { htmlLabel: 'home', target: 'someTarget' } ]
            } );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         beforeEach( ngMocks.inject( function( axFlowService ) {
            constructAnchor_ = spyOn( axFlowService, 'constructAnchor' ).and.callFake( function() {
               return '#/mockPlace';
            } );
         } ) );

         beforeEach( axMocks.widget.load );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'uses the configured targets to generate the corresponding URLs', function() {
            expect( constructAnchor_ ).toHaveBeenCalledWith( 'someTarget' );
            expect( axMocks.widget.$scope.links[ 0 ] ).toEqual( { href: '#/mockPlace', htmlLabel: 'home' } );
         } );

      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'with buttons', function() {

         var buttons_;

         beforeEach( function() {
            buttons_ = [ { htmlLabel: 'submit', target: '_self' } ];
            axMocks.widget.configure( { buttons: buttons_ } );
         } );

         beforeEach( axMocks.widget.load );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'allows to navigate through events', function() {
            axMocks.widget.$scope.$apply( function() {
               axMocks.widget.$scope.handleClick( buttons_[ 0 ] );
            } );
            expect( axMocks.widget.axEventBus.publish ).toHaveBeenCalledWith( 'navigateRequest._self', {
               target: '_self'
            } );
         } );

      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

   } );
} );
