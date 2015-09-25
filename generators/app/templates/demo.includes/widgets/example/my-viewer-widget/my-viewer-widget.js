<%- banner%>
define( [
   'angular',
   'laxar-patterns'
], function( ng, patterns ) {
   'use strict';

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   Controller.$inject = [ '$scope', 'axEventBus' ];

   function Controller( $scope, eventBus ) {
      var resource = $scope.features.document.resource;
      eventBus.subscribe( 'didReplace.' + resource, function( event ) {
         $scope.model = event.data;
      } );
      eventBus.subscribe( 'didUpdate.' + resource, function( event ) {
         patterns.json.applyPatch( $scope.model, event.patches );
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'myViewerWidget', [] ).controller( 'MyViewerWidgetController', Controller );

} );
