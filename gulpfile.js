// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('./src/app/event/event.component.sass').pipe(sass()).pipe(gulp.dest('./src/app/event/'));
    gulp.src('./src/app/schedule/schedule.component.sass').pipe(sass()).pipe(gulp.dest('./src/app/schedule/'))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('*.sass', ['sass']);
})
