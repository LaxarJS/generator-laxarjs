/*global module */
/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

var path = require( 'path' );

function createBanner( placeholder ) {
   'use strict';
   var banner = '/**\n * Copyright ' + new Date().getFullYear();

   if( placeholder.author ) {
      banner = banner + ' ' +  placeholder.author;
   }
   banner = banner + '\n';

   if( placeholder.licenses !== true ) {
      banner = banner + ' * Released under the ' + placeholder.licenseText + '\n';
   }

   if( placeholder.homepage ) {
      banner = banner + ' * ' + placeholder.homepage + '\n';
   }

   banner = banner + ' */';
   return banner;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createLicenseText( licenses ) {
   if( licenses.length === 0 ) {
      return [ {
         licenseLabel: 'private',
         licenses: true,
         licenseText: ''
      }, 'none' ];
   }
   else if( licenses.length === 1 ) {
      return [ {
         licenseLabel: 'license',
         licenses: '"' + licenses[ 0 ] + '"',
         licenseText: licenses[ 0 ] + ' license'
      }, licenses ];
   }
   else {
      return [ {
         licenseLabel: 'license',
         licenses: '[ \"' + licenses.join( '\", \"' ) + '\" ]',
         licenseText: licenses.join( ', ' ) + ' licenses'
      }, licenses ];
   }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function determineArtifactDirName( generator, defaultPath ) {
   if( generator.options.directory.length > 0 ) {
      return generator.options.directory;
   }
   if( generator.name ) {
      return defaultPath;
   }
   if( generator.env.cwd !== generator.destinationRoot() ) {
      return path.dirname( path.relative( generator.destinationRoot(), generator.env.cwd ) );
   }
   return defaultPath;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function determineArtifactName( generator ) {
   if( generator.name ) {
      return generator.name;
   }
   if( generator.env.cwd !== generator.destinationRoot() && generator.options.directory.length === 0) {
      var artifactPath = path.relative( generator.destinationRoot(), generator.env.cwd );
      return path.basename( artifactPath );
   }
   return '';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
   createBanner: createBanner,
   createLicenseText: createLicenseText,
   determineArtifactDirName: determineArtifactDirName,
   determineArtifactName: determineArtifactName
};
