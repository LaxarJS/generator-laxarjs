<%- banner %>
import React from 'react';
import ax from 'laxar';

const injections = [ 'axContext', 'axReactRender' ];

function create( context, reactRender ) {

   return {
      onDomAvailable: render
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function render() {
      reactRender( <div></div> );
   }
};

export default {
   name: '<%=name%>',
   injections: injections,
   create: create
};
