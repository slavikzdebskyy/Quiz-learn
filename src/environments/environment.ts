// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  local: {
    saveUser: '/users/signup',
    loginUser: '/users/login',
    acountUser: '/users/getuser',
    logOutUser: '/users/logout',
    saveAdmin: '/administrators/newadmin',
    loginAdmin: '/administrators/loginadmin',
    addWord: '/dictionary/newword',
    getWordsByTitle: '/dictionary/bytitle'
  },
  defaultToken: 'TdhfDHsue647sf2skJDhuH739kdf',
  localStorageName: 'usersToken',
  // apiBaseUrlServer: 'http://localhost:3000'
  apiBaseUrlServer: 'https://quiz-learn.herokuapp.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
