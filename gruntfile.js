module.exports = function (grunt) {
    grunt.initConfig({
        exec: {
            runserver: {
                command:'node index.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-exec');
    grunt.registerTask('default', function () {
        console.log('test');

    });

    grunt.registerTask('serve', ['exec:runserver']);
};
