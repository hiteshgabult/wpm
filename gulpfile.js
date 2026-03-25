import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import del from 'del';

const paths = {
  html: 'src/html/**/*.html',
  dist: 'dist/'
};

export const clean = () => del([paths.dist]);

export const html = () => {
  return gulp.src(paths.html)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist));
};

export const build = gulp.series(clean, html);
export default gulp.series(clean, html);
