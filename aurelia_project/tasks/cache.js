/* eslint-env node */

'use strict';

var gulp = require('gulp');
var packageJson = require('../../package.json');
var path = require('path');
var swPrecache = require('../../node_modules/sw-precache/lib/sw-precache.js');

var DIST_DIR = './';

export default function generateServiceWorker(done) {
  writeServiceWorkerFile(DIST_DIR, true);
  done();
};

function writeServiceWorkerFile(rootDir, handleFetch) {
  const config = {
    cacheId: packageJson.name,
    /*
    dynamicUrlToDependencies: {
      'dynamic/page1': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page1.jade')
      ],
      'dynamic/page2': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page2.jade')
      ]
    },
    */
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: handleFetch,
    //logger: $.util.log,
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /\/api\/rayen\/General\//,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 30,
          name: 'general-lookup-cache'
        }
      }
    }, {
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /\/api\/rayen\/Farmacia\/(TipoReceta)/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 5,
          name: 'farmacia-lookup-cache'
        }
      }
    }],
    staticFileGlobs: [
      `${rootDir}styles/**.css`,
      `${rootDir}**.html`,
      `${rootDir}**.ico`,
      `${rootDir}images/**.*`,
      `${rootDir}fonts/**.*`,
      `${rootDir}scripts/**.js`
    ],
    stripPrefix: `${rootDir}/`,
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true,
    maximumFileSizeToCacheInBytes: 4097152
  };
  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, () => {});
}
