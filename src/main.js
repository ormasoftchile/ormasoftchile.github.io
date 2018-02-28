import environment from './environment';
import $ from 'jquery';
import 'bootstrap';
import moment from 'moment';

export async function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature('resources')
        .plugin('aurelia-animator-css');
        
    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    /* setup the api endpoints first (if desired) */
    aurelia
        .use
        .plugin('aurelia-dialog', config => {
            config.useDefaults();
            config.settings.lock = false;
            config.settings.centerHorizontalOnly = false;
            config.settings.startingZIndex = 2000;
            config.settings.keyboard = true;
        })
        .plugin('aurelia-validation', config => {
            // console.log(config);
            // config.customValidator(rutChileno);
        })
        ;

    moment.locale('es');
    await aurelia.start();
    await aurelia.setRoot();
    if (!environment.debug) {
        const HAS_SW = 'serviceWorker' in navigator;
        if (HAS_SW) {
            try {
                const registration = await navigator.serviceWorker.register('service-worker.js');
                // Registration was successful
                console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
                if (typeof registration.update == 'function') {
                    registration.update();
                }
                // updatefound is fired if service-worker.js changes.
                registration.onupdatefound = function () {
                    const installingWorker = registration.installing;
                    installingWorker.onstatechange = function () {
                        switch (installingWorker.state) {
                            case 'installed':
                                if (navigator.serviceWorker.controller) {
                                    console.log('New or updated content is available.');
                                } else {
                                    console.log('Content is cached, and will be available for offline use the next time the page is loaded.');
                                }
                                break;
                            case 'redundant':
                                console.error('The installing service worker became redundant.');
                                break;
                        }
                    };
                }
            } catch (err) {
                // registration failed :(
                console.error(`ServiceWorker registration failed: ${err}`);
            };
        }
    }
}
