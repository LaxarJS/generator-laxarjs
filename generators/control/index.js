/*global module */
/*global process */
/**
 * Copyright 2016 aixigo AG
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
      this.option( 'banner', {
         type: String,
         defaults: '',
         desc: 'Path to a file with a banner'
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
         banner:  util.getBanner( this )
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
         type: 'list',
         name: 'laxarIntegrationTechnology',
         message: 'Integration technology:',
         choices: [ 'plain', 'angular', 'react' ],
         default: this.placeholder.laxarIntegrationTechnology
      }, {
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

         if( this.placeholder.laxarIntegrationTechnology === 'angular' ) {
            this.placeholder.angularDirectiveName = createAngularDirectiveName( this.placeholder.name );
         }
         else if( this.placeholder.laxarIntegrationTechnology === 'react' ) {
            this.placeholder.reactClassName = createReactClassName( this.placeholder.name );
         }

         this.placeholder.cssClassName = _.kebabCase( this.placeholder.name );
         this.placeholder.banner = util.createBanner( this );
         done();

      }.bind( this ) );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   configuring: function() {
      'use strict';
      this.config.set( {
         author: this.placeholder.author,
         homepage: this.placeholder.homepage,
         licenses: this.licenses,
         laxarIntegrationTechnology: this.placeholder.laxarIntegrationTechnology,
         banner: this.placeholder.banner
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
      var integrationTechnology = this.placeholder.laxarIntegrationTechnology;

      if( this.placeholder.infrastructure ) {
         filesToCopy[ 'README.md' ] = 'README.md';
         if( integrationTechnology === 'react' ) {
            filesToCopy[ 'bower.react.json' ] = 'bower.json';
         }
         else {
            filesToCopy[ 'bower.json' ] = 'bower.json';
         }
      }


      if( integrationTechnology === 'plain' ) {
         filesToCopy[ 'control.plain.js' ] = this.placeholder.name + '.js';
      }
      else if( integrationTechnology === 'angular' ) {
         filesToCopy[ 'control.angular.js' ] = this.placeholder.name + '.js';
      }
      else if( integrationTechnology === 'react' ) {
         filesToCopy[ 'control.react.jsx' ] = this.placeholder.name + '.jsx';
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
      if( this.placeholder.laxarIntegrationTechnology === 'react' ) {
         var link = 'https://laxarjs.org/docs/laxar-react-adapter-v0-latest/';
         this.log( '\nEnsure that your application is prepared for using the ' +
                   this.placeholder.laxarIntegrationTechnology + ' adapter or do the necessary steps which' +
                   ' are described in the documentation of the adapter:' );
         this.log( link );
         this.log( '\nThen you can start developing your control!' );
      }
      else {
         this.log( '\nYou can now start developing your control!' );
      }
      this.log( 'For more information about developing controls with LaxarJS, please refer to the manuals:' );
      this.log( '\nhttps://laxarjs.org/docs/laxar-v1-latest/manuals/' );
   }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createReactClassName( artifact ) {
   'use strict';
   return artifact.split( /[-_\s]/ ).map( function( part, index ) {
      return part.charAt( 0 ).toUpperCase() + part.slice( 1 );
   } ).join( '' );
}

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
