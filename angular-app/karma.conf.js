// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    preprocessors: {
      'app/modules/login/*.js' :'coverage',
      'app/services/*.js' :'coverage'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

      // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/libs/jquery/dist/jquery.js',
      'app/libs/angular/angular.js',
      'app/libs/angular-mocks/angular-mocks.js',
      'app/libs/angular-resource/angular-resource.js',
      'app/libs/angular-cookies/angular-cookies.js',
      'app/libs/angular-sanitize/angular-sanitize.js',
      'app/libs/angular-route/angular-route.js',
      'app/libs/ark-components/dist/scripts/ark-components-min.js',
      'app/scripts/app.js',
      'app/modules/**/*.js',
      'app/services/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: ['app/scripts/app.template.js'],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

  });
};

