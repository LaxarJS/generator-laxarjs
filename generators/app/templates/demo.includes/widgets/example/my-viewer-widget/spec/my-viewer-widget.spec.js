<%- banner %>
define( [
   'json!../widget.json',
   'laxar-mocks'
], function( descriptor, axMocks ) {
   'use strict';

   // More information on widget tests:
   // https://laxarjs.org/docs/laxar-mocks-v1-latest/manuals/
   describe( 'The my-viewer-widget', function() {

      beforeEach( axMocks.createSetupForWidget( descriptor ) );
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

      it( 'subscribes to (incremental) changes to its document resource', function() {

         expect( axMocks.widget.axEventBus.subscribe ).toHaveBeenCalledWith(
            'didReplace.myDocument',
            jasmine.any( Function )
         );

         expect( axMocks.widget.axEventBus.subscribe ).toHaveBeenCalledWith(
            'didUpdate.myDocument',
            jasmine.any( Function )
         );

      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'having received a document resource', function() {

         beforeEach( function() {
            axMocks.eventBus.publish( 'didReplace.myDocument', {
               resource: 'myDocument',
               data: { htmlTitle: 'Title', htmlText: 'and text' }
            } );
            axMocks.eventBus.flush();
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'reflects the resource state', function() {
            expect( axMocks.widget.$scope.model ).toEqual( { htmlTitle: 'Title', htmlText: 'and text' } );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         describe( 'and subsequent updates', function() {

            beforeEach( function() {
               axMocks.eventBus.publish( 'didUpdate.myDocument', {
                  resource: 'myDocument',
                  patches: [
                     { op: 'replace', path : '/htmlTitle', value : 'Hey!' },
                     { op: 'replace', path : '/htmlText', value : 'Ho!' }
                  ]
               } );
               axMocks.eventBus.flush();
            } );

            //////////////////////////////////////////////////////////////////////////////////////////////////

            it( 'reflects the updated resource state', function() {
               expect( axMocks.widget.$scope.model ).toEqual( { htmlTitle: 'Hey!', htmlText: 'Ho!' } );
            } );

         } );

      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

   } );
} );
