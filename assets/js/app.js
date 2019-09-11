var sports = ['football', 'baseball', 'track and field', 'skiing', 'basketball']

// when the page loads
// create buttons dynamically from an array

function renderButtons() {
  // loop over the sports
  for (var i = 0; i < sports.length; i++) {
    // create a new button for the sport
    // give it data-sport attribute
    // set its text
    var button = $('<button>')
      .attr('data-sport', sports[i])
      .attr('class', 'btn btn-dark mr-2')
      .text(sports[i][0].toUpperCase() + sports[i].substr(1))

    // append it to container
    $('#button-container').append(button)
  }
}

function fetchGiphies(sport) {
  var queryUrl =
    'https://api.giphy.com/v1/gifs/search?api_key=rzIeQ4pTrOycKBcpDqQIMB7k6uXNIbDL&limit=5&offset=0&rating=PG-13&lang=en&q=' +
    sport

  $.ajax({
    url: queryUrl,
    method: 'GET'
  }).then(function(response) {
    var imageUrl
    var imageTitle
    var img
    var imageDiv = $('<div>')

    // loop over array of response images and add them to the page
    for (var i = 0; i < response.data.length; i++) {
      imageUrl = response.data[i].images.original.url
      imageTitle = response.data[i].title

      // create a new img and set the src attribute
      img = $('<img>')
        .attr('src', imageUrl)
        .attr('alt', imageTitle)
        .attr('class', 'rounded gallery-img')

      // append the image to the page
      imageDiv.append(img)
    }

    // empty the image gallery and append the new images
    $('#image-gallery')
      .empty()
      .append(imageDiv)
  })
}

// when the user clicks on a button
$(document).on('click', 'button', function() {
  var sport = $(this).attr('data-sport')
  fetchGiphies(sport)
})

renderButtons()
