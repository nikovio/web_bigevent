$.ajaxPrefilter(function(options){
    console.log(options.url)
    options.url='http://127.0.0.1:5000'+options.url
})