<%- banner %>
define( [
   'angular'
], function( ng ) {
   'use strict';

   var directiveName = '<%= angularDirectiveName %>';

   var directive = [ function() {
      return {
         template: '<!-- :) -->',
         link: function( scope, element, attrs ) {

            /* :) */

         }
      };
   } ];

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( directiveName, [] ).directive( directiveName, directive );

} );
