<%- banner %>
define( [], function() {
   'use strict';

   return {
      name: '<%= name %>',
      injections: [ 'axContext' ],
      create: function( context ) {

         /* :) */

         return {
            renderTo: function( element ) {
               // `element` is the instantiated template of the widget, already attached to the page DOM
            }
         };
      }
   };
} );
