<%- banner %>
define( [
   'angular',
   'text!./default.theme/<%= name %>.html'
], function( ng, <%= angularDirectiveName %>Template  ) {
   'use strict';

   var directiveName = '<%= angularDirectiveName %>';

   var directive = [ function() {
      return {
         template: <%= angularDirectiveName %>Template,
         link: function( scope, element, attrs ) {

            /* :) */

         }
      };
   } ];

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( directiveName, [] ).directive( directiveName, directive );
} );
