var tests = [
    // Load mocks and vendor init
    'tests/mocks/init',
    'tests/vendor/init',

    // ---------------------------
    // Load Specs (AKA tests)
    'tests/spec-app-task',
    'tests/spec-app-tasks',
    'tests/spec-app-header-view',
    'tests/spec-app-task-view',
    'tests/spec-app-list-view',
    'tests/spec-app-list-layout'
];

requirejs.config({
    baseUrl: '/base/src/static/js',

    paths:{
        'tests': 'specs',
        'jasmine': 'specs/vendor/jasmine',
        'spec-helpers': 'specs/vendor/spec-helpers'
    },

    shim: {
        'jasmine/jasmine-jquery': {
            'deps': ['jquery']
        },
    },

    deps: tests,

    callback: window.__karma__.start
});
