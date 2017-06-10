function retrieveData(choice){

  //alert("a");
  if(choice===1){
    var searchTerm = $("#searchField").val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&search=" + searchTerm + "&callback=?";
    if(searchTerm!==''){
    $.ajax({
      type:'GET',
      url:url,
      async:true,
      dataType:'json',
      success:function(data){
        //console.log(data);
        $("a").hide();
        //Setting the text or the headings.

        $("#resultsBar").text("Showing top 5 results for " + '"' + searchTerm + '".');

        $("#h1").text(data[1][0]);
        $("#h2").text(data[1][1]);
        $("#h3").text(data[1][2]);
        $("#h4").text(data[1][3]);
        $("#h5").text(data[1][4]);

        //Setting the text for the media-body.
        $("#p1").text(data[2][0]);
        $("#p2").text(data[2][1]);
        $("#p3").text(data[2][2]);
        $("#p4").text(data[2][3]);
        $("#p5").text(data[2][4]);


        //Adding the href attribute for the respective links.
        $("#a1").attr('href',data[3][0]);
        $("#a2").attr('href',data[3][1]);
        $("#a3").attr('href',data[3][2]);
        $("#a4").attr('href',data[3][3]);
        $("#a5").attr('href',data[3][4]);


        $("a").attr('target','_blank');

        $("a[id^='a']").show(500);
      },
      error:function(error){
        alert("Something's not right!");
    }
    });
    }
  }
  else{
    //User chose a random article.
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  }

}

$(document).ready(function(){

  //Funtion to get the search results and display them into the respective media objects.

  $("a").hide();

  $("#searchField").keypress(function(event){
    //alert("You  pressed a key!");
    if(event.keyCode===13){
      //console.log("Ready function");
      //Then call a function which retrives the search results.
     retrieveData(1); //One is the code for retrieving search results for search bar.
    }
  });
  $("#random").on('click',function(){
    //Retrieve data for random topics.
    retrieveData(2);  //'2' for random.
  });


});