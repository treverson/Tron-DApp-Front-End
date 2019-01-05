// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    
    //Ateeq System
    /* serviceUrl: 'http://192.168.100.10:4200/api/' */

     //localhost
     /* serviceUrl: 'http://127.0.0.1:4200/api/' */

    //Development Server
    /* serviceUrl: 'http://35.183.152.54:4200/api/' */

    //Live Server
    /* serviceUrl: 'https://healthport.io/api/' */
    serviceUrl: 'https://api.healthport.io/'

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
