/*global module */
/*global process */
/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

var generators = require( 'yeoman-generator' );
var path = require( 'path' );
var _ = require( 'lodash' );
var util = require( '../../lib/util' );
var commonPrompts = require( '../../lib/common-prompts' );
var bowerDefaults = require('../../lib/bower-defaults.json' );

module.exports = generators.Base.extend( {

   constructor: function() {
      'use strict';
      generators.Base.apply( this, arguments );
      this.argument( 'name', {
         type: String,
         required: false,
         desc: 'Name of the artifact'
      } );
      this.option( 'directory', {
         type: String,
         defaults: '',
         desc: 'Base directory for controls'
      } );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   initializing: function() {
      'use strict';
      var controlName = util.determineArtifactName( this );
      this.controlDirname = util.determineArtifactDirName( this, path.join( 'includes', 'controls' ) );
      var laxarIntegrationTechnology = this.config.get( 'laxarIntegrationTechnology' ) || 'plain';

      this.placeholder = {
         name: controlName,
         angularDirectiveName: '',
         description: '',
         licenses: this.config.get( 'licenses' ),
         homepage: this.config.get( 'homepage' ),
         author: this.config.get( 'author' ),
         laxarIntegrationTechnology: laxarIntegrationTechnology,
         cssClassName: '',
         banner: ''
      };

      this.placeholder.dependencies = bowerDefaults.dependencies;
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   prompting: function() {
      'use strict';
      var done = this.async();

      commonPrompts.greetings( this, 'control' );

      var prompts = commonPrompts.prompts( 'control', this.placeholder );
      prompts.push( {
         type: 'confirm',
         name: 'infrastructure',
         message: 'Create project infrastructure (README.md, bower.json)?',
         default: false
      } );

      this.prompt( prompts, function( answers ) {

         for( var answerName in answers ) {
            if( answers.hasOwnProperty( answerName ) ) {
               this.placeholder[ answerName ] = answers[ answerName ];
            }
         }

         var licenseList = util.createLicenseText( answers.licenses );
         this.license = licenseList[ 1 ];
         for( var key in licenseList[ 0 ] ) {
            if( licenseList[ 0 ].hasOwnProperty( key ) ) {
               this.placeholder[ key ] = licenseList[ 0 ][ key ];
            }
         }

         this.placeholder.angularDirectiveName = createAngularDirectiveName( this.placeholder.name );
         this.placeholder.cssClassName = _.kebabCase( this.placeholder.name );

         this.placeholder.banner = util.createBanner( this.placeholder );
         done();

      }.bind( this ) );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   configuring: function() {
      'use strict';
      this.config.set( {
         author: this.placeholder.author,
         homepage: this.placeholder.homepage,
         licenses: this.licenses
      } );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   writing: function() {
      'use strict';
      var filesToCopy = {
         'control.json': 'control.json',
         'gitignore': '.gitignore',
         'default.theme/css/control.css': 'default.theme/css/' + this.placeholder.name + '.css'
      };
      if( this.placeholder.infrastructure ) {
         filesToCopy[ 'README.md' ] = 'README.md';
         filesToCopy[ 'bower.json' ] = 'bower.json';
      }

      if( this.placeholder.laxarIntegrationTechnology === 'plain' ) {
         filesToCopy[ 'control.plain.js' ] = this.placeholder.name + '.js';
      }
      else if( this.placeholder.laxarIntegrationTechnology === 'angular' ) {
         filesToCopy[ 'control.angular.js' ] = this.placeholder.name + '.js';
      }

      for( var file in filesToCopy ) {
         if( filesToCopy.hasOwnProperty( file ) ) {
            this.fs.copyTpl(
               this.templatePath( file ),
               this.destinationPath(
                  path.join( this.controlDirname, this.placeholder.name, filesToCopy[ file ] )
               ),
               this.placeholder
            );
         }
      }
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   end: function() {
      'use strict';
      this.log( '\nYou can now start developing your control!' );
      this.log( 'For more information about developing controls with LaxarJS, please refer to the manuals:' );
      this.log( '\nhttps://github.com/LaxarJS/laxar/blob/master/docs/manuals/index.md#manuals' );
   }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createAngularDirectiveName( artifact ) {
   'use strict';
   return artifact.split( /[-_\s]/ ).map( function( part, index ) {
      if( index === 0 ) {
         return part;
      }
      return part.charAt( 0 ).toUpperCase() + part.slice( 1 );
   } ).join( '' );
}
