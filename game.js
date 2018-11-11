var animals = ["Panda", "Koala", "Kangaroo"];

function displayAnimalInfo() {

    var input = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      input + "&api_key=OTqm91vJ1lMjs2GFyAgYiZEJV56BIRDu";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(queryURL);

        console.log(response);

        var results = response.data;

        for (var i = 0; i < 10; i++) {

          var animalDiv = $("<div>");

          var p = $("<p>").text("Rating: " + results[i].rating);

          var animalImage = $("<img>");

          animalImage.attr('src', results[i].images.fixed_height_still.url).attr('data-still', results[i].images.fixed_height_still.url).attr('data-animate', results[i].images.fixed_height.url).attr('data-state', 'still').addClass('gif');
          
          animalDiv.append(animalImage);
          animalDiv.append(p);

          $("#animal-view").prepend(animalDiv);
        }
        $(".gif").on("click", function() {
      
          var state = $(this).attr("data-state");
          
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });    
      })
    }



function renderButtons() {

    $("#animal-buttons").empty();

    for (var i = 0; i < animals.length; i++) {

      var a = $("<button>");
      
      a.addClass("animal");
      
      a.attr("data-name", animals[i]);
      
      a.text(animals[i]);
      
      $("#animal-buttons").append(a);
    }
  }

$("#add-animal").on("click", function(event) {

    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    animals.push(animal);

    renderButtons();
});

  $(document).on("click", ".animal", displayAnimalInfo);

  renderButtons();
