/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

/* global module */
/* global process */

var generators = require( 'yeoman-generator' );
var path = require( 'path' );
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var util = require( '../../lib/util' );
var commonPrompts = require( '../../lib/common-prompts' );
var bowerDefaults = require('../../lib/bower-defaults.json' );

module.exports = generators.Base.extend( {

   constructor: function() {
      'use strict';
      generators.Base.apply( this, arguments );
      this.option( 'banner', {
         type: String,
         defaults: '',
         desc: 'Path to a file with a banner'
      } );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   initializing: function() {
      'use strict';
      var pathBasename = path.basename( this.destinationRoot() );

      this.placeholder = {
         name: pathBasename,
         description: '',
         licenseLabel: 'license',
         homepage: this.config.get( 'homepage' ),
         author: this.config.get( 'author' ),
         port: '8000',
         version: '0.1.0-pre',
         widgets: true,
         cssClassName: '',
         banner: util.getBanner( this )
      };
      this.placeholder.licenses = this.config.get( 'licenses' )? this.config.get( 'licenses' ) : 'none';

      this.placeholder.dependencies = bowerDefaults.dependencies;
      this.placeholder.devDependencies = bowerDefaults.devDependencies;

   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   prompting: function() {
      'use strict';
      var done = this.async();

      this.log( '\nLaxarJS generator v' + this.rootGeneratorVersion()  + '\n' );
      this.log( 'Create a LaxarJS application\n' );
      this.log( 'This generator will create the basic file- and directory structure' +
                ' of a LaxarJS application in the current directory.\n' );
      this.log( 'For more information about a LaxarJS application, please see the docs at' );
      this.log( 'https://github.com/LaxarJS/laxar/blob/master/docs/concepts.md#laxarjs-concepts\n' );

      var prompts = commonPrompts.prompts( 'application', this.placeholder );
      prompts.push( {
         type: 'input',
         name: 'port',
         message: 'Development server port:',
         default: this.placeholder.port
      }, {
         type: 'confirm',
         name: 'widgets',
         message: 'Should a set of example widgets be generated?',
         default: this.placeholder.widgets
      } );

      this.prompt( prompts, function( answers ) {

         for( var answerName in answers ) {
            if( answers.hasOwnProperty( answerName ) ) {
               this.placeholder[ answerName ] = answers[ answerName ];
            }
         }
         this.placeholder.cssClassName = this.placeholder.name.replace( /[_\s]+/, '-' );

         var licenseList = util.createLicenseText( answers.licenses );
         this.license = licenseList[ 1 ];
         for( var key in licenseList[ 0 ] ) {
            if( licenseList[ 0 ].hasOwnProperty( key ) ) {
               this.placeholder[ key ] = licenseList[ 0 ][ key ];
            }
         }

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
         licenses:  this.license,
         banner: this.placeholder.banner
      } );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   writing: function() {
      'use strict';
      var filesToCopy = {
         'gitignore': '.gitignore',
         '.jshintrc': '.jshintrc',
         'bower.json': 'bower.json',
         'debug.html': 'debug.html',
         'Gruntfile.js': 'Gruntfile.js',
         'index.html': 'index.html',
         'init.js': 'init.js',
         'package.json': 'package.json',
         'README.md': 'README.md',
         'require_config.js': 'require_config.js'
      };

      if( this.placeholder.widgets ) {
         filesToCopy[ 'demo.application' ] = 'application';
         filesToCopy[ 'demo.includes' ] = 'includes';
      }
      else {
         filesToCopy[ 'bare.application' ] = 'application';
         mkdirp.sync( path.join( this.destinationRoot(), 'includes', 'widgets' ) );
      }
      mkdirp.sync( path.join( this.destinationRoot(), 'includes', 'themes' ) );

      for( var file in filesToCopy ) {
         if( filesToCopy.hasOwnProperty( file ) ) {
            this.fs.copyTpl(
               this.templatePath( file ),
               this.destinationPath( filesToCopy[file] ),
               this.placeholder
            );
         }
      }
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   end: function() {
      'use strict';
      this.log( '\n\n' );
      this.log( 'Now run ' + chalk.bold.italic( 'npm install' ) + ' to get tools and dependencies.' );
      this.log( 'Then you can run ' + chalk.bold.italic( 'grunt start' ) + ' to start the developing server (port ' + this.placeholder.port + ').' );
      this.log( 'Have fun developing your LaxarJS application! \n' );
      this.log( 'Also, please have a look at the manuals:' );
      this.log( 'https://github.com/LaxarJS/laxar/blob/master/docs/manuals/index.md'  );
   }
} );
