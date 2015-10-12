/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

/*global module */
/*global process */

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
      this.option( 'activity', {
         type: Boolean,
         defaults: false,
         desc: 'Create an activity instead of a widget'
      } );
      this.option( 'directory', {
         type: String,
         defaults: '',
         desc: 'Base directory for widgets'
      } );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   initializing: function() {
      'use strict';
      var laxarIntegrationTechnology = this.config.get( 'laxarIntegrationTechnology' ) || 'plain';
      var artifactType = this.options.activity ? 'activity' : 'widget';

      var widgetName = util.determineArtifactName( this );
      this.widgetDirname = util.determineArtifactDirName( this, path.join( 'includes', 'widgets' ) );

      this.placeholder = {
         name: widgetName,
         description: '',
         licenseLabel: 'license',
         licenses: this.config.get( 'licenses' ),
         homepage: this.config.get( 'homepage' ),
         author: this.config.get( 'author' ),
         laxarIntegrationTechnology: laxarIntegrationTechnology,
         cssClassName: '',
         banner: '',
         artifactType: artifactType,
         path: widgetName
      };

      this.placeholder.dependencies = bowerDefaults.dependencies;
      this.placeholder.devDependencies = bowerDefaults.devDependencies;
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   prompting: function() {
      'use strict';
      var done = this.async();

      commonPrompts.greetings( this, this.placeholder.artifactType );

      var prompts = commonPrompts.prompts( this.placeholder.artifactType, this.placeholder );
      prompts.push( {
         type: 'list',
         name: 'laxarIntegrationTechnology',
         message: 'Integration technology:',
         choices: [ 'plain', 'angular' ],
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

         this.placeholder.angularModuleName =
            _.camelCase( this.placeholder.name );
         this.placeholder.angularControllerName =
            _.capitalize( _.camelCase( this.placeholder.name ) ) + 'Controller';

         if( !this.options.activity ) {
            this.placeholder.cssClassName = _.kebabCase( this.placeholder.name );
         }

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
         licenses: this.license,
         laxarIntegrationTechnology: this.placeholder.laxarIntegrationTechnology
      } );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   writing: function() {
      'use strict';
      var filesToCopy = {
         'widget.json': 'widget.json',
         'gitignore': '.gitignore',
         'spec/spec_runner.html': 'spec/spec_runner.html',
         'spec/spec_runner.js': 'spec/spec_runner.js',
         'spec/widget.spec.js': 'spec/' + this.placeholder.name + '.spec.js'
      };

      if( !this.options.activity ) {
         filesToCopy[ 'default.theme/widget.html' ] = 'default.theme/' + this.placeholder.name + '.html';
         filesToCopy[ 'default.theme/css/widget.css' ] = 'default.theme/css/' + this.placeholder.name + '.css';
      }

      if( this.placeholder.laxarIntegrationTechnology === 'plain' ) {
         if( this.options.activity ) {
            filesToCopy[ 'controller.plain.activity.js' ] = this.placeholder.name + '.js';
         }
         else {
            filesToCopy[ 'controller.plain.widget.js' ] = this.placeholder.name + '.js';
         }
      }
      else if( this.placeholder.laxarIntegrationTechnology === 'angular' ) {
         filesToCopy[ 'controller.angular.js' ] = this.placeholder.name + '.js';
      }

      if( this.placeholder.infrastructure ) {
         filesToCopy[ 'README.md' ] = 'README.md';
         if( !this.options.activity ) {
            filesToCopy[ 'bower.widget.json' ] = 'bower.json';
         }
         else {
            filesToCopy[ 'bower.activity.json' ] = 'bower.json';
         }
      }
      for( var file in filesToCopy ) {
         if( filesToCopy.hasOwnProperty( file ) ) {
            this.fs.copyTpl(
               this.templatePath( file ),
               this.destinationPath(
                  path.join( this.widgetDirname, this.placeholder.name, filesToCopy[ file ] )
               ),
               this.placeholder
            );
         }
      }
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   end: function() {
      'use strict';
      this.log( '\nYou can now start developing your ' + this.placeholder.artifactType + '!' );
      this.log( 'For more information about developing widgets with LaxarJS, please refer to the manuals:' );
      this.log( '\nhttps://github.com/LaxarJS/laxar/blob/master/docs/manuals/index.md#manuals' );
   }
} );
