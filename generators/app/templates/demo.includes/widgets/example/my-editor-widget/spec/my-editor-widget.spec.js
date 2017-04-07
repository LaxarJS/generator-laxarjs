<%- banner %>
define( [
   'json!../widget.json',
   'laxar-mocks'
], function( descriptor, axMocks ) {
   'use strict';

   // More information on widget tests:
   // https://laxarjs.org/docs/laxar-mocks-v1-latest/manuals/
   describe( 'The my-editor-widget', function() {

      beforeEach( axMocks.createSetupForWidget( descriptor, {} ) );
      afterEach( axMocks.tearDown );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      beforeEach( function() {
         axMocks.widget.configure( {
            document: {
               resource: 'myDocument'
            }
         } );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      beforeEach( axMocks.widget.load );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'upon entry navigation', function() {

         beforeEach( function() {
            axMocks.triggerStartupEvents();
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'publishes the initial state of its document resource', function() {
            expect( axMocks.widget.axEventBus.publish ).toHaveBeenCalledWith(
               'didReplace.myDocument',
               jasmine.any( Object )
            );
         } );

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         describe( 'after the document title was edited', function() {

            beforeEach( function() {
               axMocks.widget.$scope.model.htmlTitle = 'Hey!';
               axMocks.widget.$scope.$apply();
            } );

            /////////////////////////////////////////////////////////////////////////////////////////////////////

            it( 'publishes the corresponding update to the document resource', function() {
               expect( axMocks.widget.axEventBus.publish ).toHaveBeenCalledWith(
                  'didUpdate.myDocument',
                  {
                     resource: 'myDocument',
                     patches: [
                        { op: 'replace', path : '/htmlTitle', value : 'Hey!' }
                     ]
                  }
               );
            } );

         } );

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         describe( 'after the document text was edited', function() {

            beforeEach( function() {
               axMocks.widget.$scope.model.htmlText = 'Ho!';
               axMocks.widget.$scope.$apply();
            } );

            /////////////////////////////////////////////////////////////////////////////////////////////////////

            it( 'publishes the corresponding update to the document resource', function() {
               expect( axMocks.widget.axEventBus.publish ).toHaveBeenCalledWith(
                  'didUpdate.myDocument',
                  {
                     resource: 'myDocument',
                     patches: [
                        { op: 'replace', path : '/htmlText', value : 'Ho!' }
                     ]
                  }
               );
            } );

         } );

      } );

   } );
} );
