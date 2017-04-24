/**
 * Created by pengzhao on 15/12/4.
 */
/* eslint-disable */
import path     from 'path';
import { argv } from 'yargs';
import {load}   from 'dotenv';
import dotenv from 'dotenv';
import chalk    from 'chalk';
import pkg      from '../package.json';

dotenv.load();
const config = new Map();
//console.log(process.env);
// -------------------------------/**/-----
// User Configuration
// ------------------------------------
//console.log(process.argv)
config.set('dir_src',  'src');
config.set('dir_dist', 'dist');
config.set('dir_test', 'tests');
//config.set('coverage_enabled', !argv.watch); // enabled if not in watch mode
config.set('coverage_reporters', [
    { type : 'text-summary' },
    { type : 'html', dir : 'coverage' }
]);

config.set('server_host',  '127.0.0.1');
config.set('server_port',  process.env.PORT || 3000);

config.set('production_enable_source_maps', false);

// Define what dependencies we'd like to treat as vendor dependencies,
// but only include the ones that actually exist in package.json. This
// makes it easier to remove dependencies without breaking the
// vendor bundle.
config.set('vendor_dependencies', [

    ].filter(dep => {
        //console.log(pkg);
        if (pkg.dependencies[dep]) return true;

console.log(chalk.yellow(
`Package "${dep}" was not found as an npm dependency and won't be ` +
`included in the vendor bundle.\n` +
`Consider removing it from vendor_dependencies in ~/config/index.js`
));
}));

/*  *********************************************
 -------------------------------------------------

 All Internal Configuration Below
 Edit at Your Own Risk

 -------------------------------------------------
 ************************************************/
// ------------------------------------
// Environment
// ------------------------------------
config.set('env', process.env.NODE_ENV);
config.set('globals', {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.get('env'))
    },
    'NODE_ENV'     : config.get('env'),
    '__DEV__'      : config.get('env') === 'development',
    '__PROD__'     : config.get('env') === 'production',
    '__DEBUG__'    : config.get('env') === 'development' && !argv.no_debug,
    '__DEBUG_NW__' : !!argv.nw
});

// ------------------------------------
// Webpack
// ------------------------------------
config.set('webpack_public_path', `http://${config.get('webpack_host')}:${config.get('webpack_port')}/`);

// ------------------------------------
// Project
// ------------------------------------
config.set('path_project', path.resolve(__dirname, '../'));

config.set('public_path',config.get('env') === 'development' ?  '': config.get('webpack_public_path'));
// ------------------------------------
// Utilities
// ------------------------------------
const paths = (() => {
        const base    = [config.get('path_project')];
const resolve = path.resolve;

const project = (...args) => resolve.apply(resolve, [...base, ...args]);

return {
    project : project,
    src     : project.bind(null, config.get('dir_src')),
    dist    : project.bind(null, config.get('dir_dist'))
};
})();

config.set('utils_paths', paths);
config.set('utils_aliases', [
        'actions',
        'components',
        'constants',
        'containers',
        'layouts',
        'reducers',
        'routes',
        'services',
        'store',
        'styles',
        'utils',
        'views'
    ].reduce((acc, dir) => ((acc[dir] = paths.src(dir)) && acc), {}));

export default config;
/* eslint-enable */
