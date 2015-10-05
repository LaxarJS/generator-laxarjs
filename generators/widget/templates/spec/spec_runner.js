<%- banner %>
( function( global ) {
   'use strict';
   global.laxarSpec = {
      title: '<%= name %> Specification',
      tests: [
         '<%= name %>.spec'
      ],
      testRunner: 'laxar-mocks',
      jasmineMajorVersion: 2
  };
} )( this );
