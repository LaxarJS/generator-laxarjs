/*global module */
/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function greetings( generator, artifact ) {
   'use strict';
   generator.log( '\nLaxarJS generator v' + generator.rootGeneratorVersion()  + '\n' );
   generator.log( 'Create a LaxarJS ' + artifact + '\n' );
   generator.log( 'This generator will create the basic file- and directory structure' +
             ' of a LaxarJS ' + artifact + '.\n' );
   generator.log( 'For more information about LaxarJS artifacts, please see the docs at' );
   generator.log( 'https://github.com/LaxarJS/laxar/blob/master/docs/concepts.md#laxarjs-concepts\n' );

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function commonPrompts( artifactType, defaults ) {
   'use strict';
   return [
      {
         type: 'input',
         name: 'name',
         message: 'The ' + artifactType + ' name:',
         default: defaults.name,
         validate: function ( input ) {
            if( input === '' ){
               return 'Please insert a name.';
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
         /*
         *  Since inquirer v1.0.0 the filter runs before the validator
         *  We must handle both orders because of different inquirer dependency of yo and yeoman-environment
         */
         filter: function ( input ) {
            if ( input === 'none' || input === '' ) {
               return [];
            }
            if( typeof input === 'object' ) {
               return input;
            }
            return input.split( ',' );
         },
         validate: function( input ) {
            var message = 'Must be one license, several comma-separated licenses or "none".';
            var regularLicenseName = /^(?:[\w\-\.\d]+(?:[,]+[\w\-\.\d]+)*)$/;
            if( typeof input === 'string' ) {
               if( regularLicenseName.test( input ) ) {
                  return true;
               }
               else if( input === '' ){
                  return true;
               }
               else {
                  return message;
               }
            }
            if( typeof input === 'object' && Array.isArray( input ) ) {
               return input.every( function( license ) {
                  return typeof license === 'string' && regularLicenseName.test( license );
               } ) || message;
            }
            return message;
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
