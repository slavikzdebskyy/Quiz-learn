// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  local: {
    saveUser: 'http://localhost:3000/users/signup',
    loginUser: 'http://localhost:3000/users/login',
    acountUser: 'http://localhost:3000/users/getuser',
    logOutUser: 'http://localhost:3000/users/logout'
  },
  defaultToken: 'TdhfDHsue647sf2skJDhuH739kdf',
  localStorageName: 'usersToken'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
