//variable array containing topics
var topics= ["Anime", "Sports", "Tv", "Clothing", "Cars", "News", "Videogames"]


//On ready use loop of var topics to append button

  $(document).ready(function () {             //loop through array and append buttons to div
    for (var i = 0; i < topics.length; i++) {         //searchGif function using topics                                                        
    $("#anime-buttons").append("<button type='button' onclick='searchGif(\"" + topics[i]   //click event execute searchGif of topics[i]
    + "\")' class='btn btn-primary' value=' " + topics[i]   //set value of topics
    + "'> " //end<> 
    + topics[i]     //array item to be displayed
    + " </button>"); //end </> and append
      }
  });



  function animeButtonClicked() {         //set userInput to value of user-input ID
    var userInput = $('#user-input').val();      //execute searchGif
    searchGif(userInput);
  }
  
  function submitButtonClicked() {          
    var userInput = $('#user-input').val();
  
    if (userInput) {            //append to anime-buttons div; an on click button using userInput
      $('#anime-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
  }
  
  function searchGif(gifName) {       //call ajax    gifName parameter
    $.ajax({
      url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC&limit=12',
      type: 'GET',
    })
      .then(function (response) {         //.then; success when the deferred is resolved
        displayGif(response);
      })
  }
  
  
  //DISPLAY AND APPEND THE GIFS
  function displayGif(response) {         //empty anime div 
    $('#anime').empty();
    for (var i = 0; i < response.data.length; i++) {          //loop through response.data 
      var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";   //take rating
  
      //image has rating and image from response data, stills it and animates it
      var image = '<img src= " ' + response.data[i].images.fixed_height_still.url +
        '" data-still=" ' + response.data[i].images.fixed_height_still.url +
        ' " data-animate=" ' + response.data[i].images.fixed_height.url + 
        '" data-state="still" class="movImage" style= "width:250px; height:250px">' + rating;
  
      image = '<div class="col-md-4">' + image + "</div>";    //set image to div
      $('#anime').append(image);         //append new image
    }
  
  
  
  
    $('.movImage').on('click', function () {        //image play pause button
      var state = $(this).attr('data-state');       //data-state is still or animate
      if (state == 'still') {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).attr("data-still"));    //change picture to still
        $(this).attr('data-state', 'still');        //change data state to still
      }
  
    });
  }