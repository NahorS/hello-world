var quote = '';
var author = '';

function getQuote(){
  $.ajax({headers:{
      "X-Mashape-Key": "WFGTThE3z3mshTMr1Sjq8NO2Z8FYp1HEQGwjsnQDZVMlGoUNKF",
        "Accept":"application/json",
        "Content-Type":"application/x-www-form-urlencoded"},
         url:"https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
          success:function(obj){
              if(typeof obj==='string')
                obj = json.parse(obj);
               $("#text").animate({opacity:0},300,
                                  function(){
                 $(this).animate({opacity:1},300);
                 $(this).text(obj.quote);
                 
               });
$("#author").animate({opacity:0},300,function(){
  $(this).animate({opacity:1},300);
  $(this).text('~ ' + obj.author);
});            
         }});}
  
$(document).ready(function(){
    getQuote();
    $("#newQuote").on("click",getQuote); 
  $('#tweet-quote').on("click",function(){
   open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='   + encodeURIComponent('"' + quote + '"' + ' ' + author));
  });
  $('#post-quote').on('click',function(){
    open('https://www.google.co.in/');
  });
});