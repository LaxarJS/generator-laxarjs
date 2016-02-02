/*global module */
/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function greetings( generator, artifact ) {
   generator.log( '\nCreate a LaxarJS ' + artifact + '\n' );
   generator.log( 'This generator will create the basic file- and directory structure' +
             ' of a LaxarJS ' + artifact + '.\n' );
   generator.log( 'For more information about LaxarJS artifacts, please see the docs at' );
   generator.log( 'https://github.com/LaxarJS/laxar/blob/master/docs/concepts.md#laxarjs-concepts\n' );

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function commonPrompts( artifactType, defaults ) {
   return [
      {
         type: 'input',
         name: 'name',
         message: 'The ' + artifactType + ' name:',
         default: defaults.name,
         validate: function ( input ) {
            'use strict';
            if( input === '' ){
               return 'Please insert a name.'
            }
            else {
               return true;
            }
         }
      }, {
         type: 'input',
         name: 'description',
         message: 'Description (optional):',
         default: defaults.description
      }, {
         type: 'input',
         name: 'licenses',
         message: 'Licenses:',
         default: defaults.licenses,
         validate: function( input ) {
            'use strict';
            var regularLicenseName = /^(?:[\w\-\.\d]+(?:[,]+[\w\-\.\d]+)*)$/;
            if( regularLicenseName.test( input ) ) {
               return true;
            }
            else if( input === '' ){
               return true;
            }
            else {
               return 'Must be one license, several comma-separated licenses or "none".';
            }
         },
         filter: function ( input ) {
            'use strict';
            if ( input === 'none' || input === '' ) {
               return [];
            }
            if( typeof input === 'object' ) {
               return input;
            }
            return input.split( ',' );
         }
      }, {
         type: 'input',
         name: 'homepage',
         message: 'Project homepage (optional):',
         default: defaults.homepage
      }, {
         type: 'input',
         name: 'author',
         message: 'Author name (optional):',
         default: defaults.author
      }
   ];
}

module.exports = {
   greetings: greetings,
   prompts: commonPrompts
};
