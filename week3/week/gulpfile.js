var gulp=require('gulp');
var sass=require('gulp-sass');
var server=require('gulp-webserver');


   gulp.task('css',function(){
       return gulp.src('./src/sass/*.scss')
              .pipe(sass())
              .pipe(gulp.dest('./src/css'))
   })
   gulp.task('watch',function(){
        return gulp.watch('./src/sass/*.scss',gulp.series('css'))
   })
   gulp.task('dev',function(){
       return gulp.src('./src')
              .pipe(server({
                  port:9090,
                  proxies:[
                      {
                          source:'/api/getList',target:'http://127.0.0.1:3000/api/getList'
                      },
                      {
                        source:'/api/addList',target:'http://127.0.0.1:3000/api/addList'
                    },
                    {
                        source:'/api/delList',target:'http://127.0.0.1:3000/api/delList'
                    },
                    {
                        source:'/api/cList',target:'http://127.0.0.1:3000/api/cList'
                    }
                  ]
              }))
   })
   gulp.task('default',gulp.series('css','dev','watch'))