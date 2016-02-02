/*global module */
/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

var path = require( 'path' );

function getBanner( generator ) {
   'use strict';
   var bannerFilePath = generator.options.banner;

   if( bannerFilePath !== '' && bannerFilePath !== true ) {
      var banner;
      try {
         banner = generator.fs.read( bannerFilePath );
      } catch( e ) {
         generator.env.error( 'Could not open file "' + bannerFilePath + '" for custom banner.' );
      }

      if( typeof banner === 'string' ) {
         return banner;
      }
   }
   return generator.config.get( 'banner' );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createBanner( generator ) {
   'use strict';
   var placeholder = generator.placeholder;

   if( placeholder.banner ) {
      return placeholder.banner;
   }

   return createBannerFromPrompts( placeholder );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function createBannerFromPrompts( placeholder ) {
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
   getBanner: getBanner,
   createBanner: createBanner,
   createLicenseText: createLicenseText,
   determineArtifactDirName: determineArtifactDirName,
   determineArtifactName: determineArtifactName
};
