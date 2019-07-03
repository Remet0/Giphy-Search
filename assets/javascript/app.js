let searchTerms = ['justice league', 'shrek', 'deadpool'];





//appends a button for each object in search terms array
function populateButtons(){
    $('.buttons').empty();
    for (let i = 0; i < searchTerms.length; i++) {
    let buttons = $('<button>');
    buttons.text(searchTerms[i]);
    buttons.attr('data-name', searchTerms[i]);
    $('.buttons').append(buttons);
    }
}
//call function to get starting buttons on screen
populateButtons();

//adds search input to the page as a button
$('#inputButton').on('click', function(e){
   
    e.preventDefault();

    let searchInput = $('#searchInput').val().trim();
    if(searchInput != ''){
        searchTerms.push(searchInput);
        $('#searchInput').val('');
    }
    populateButtons();

})


$('.buttons').on('click', 'button', function(){
    //get the data attribute for the button clicked
    let input = $(this).attr('data-name');
    //api key for giphy t3X8WSh5UuP13eOL33cqlZmOKV3kFp0W
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${input}&api_key=t3X8WSh5UuP13eOL33cqlZmOKV3kFp0W&limit=10`;

    //ajax call to the input URL to get database information and display it
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
            let results = response.data;
        for (let i = 0; i < results.length; i++) {
                let gifDiv = $('<Div>');
            console.log(response);
                let rating = results[i].rating;
                //sets up a element with the rating to be appended later
                let p = $('<p>');
                p.text(`Rating: ${rating}`);
                //sets up a element with the gif image to be appended later
                let gif = $('<img>');
                gif.attr('src', results[i].images.fixed_height_still.url).attr('id', 'gifActive').attr('data-inactive', results[i].images.fixed_height.url);
            //append both new elements
                gifDiv.append(p).append(gif);
                $('.gif').prepend(gifDiv);
        }
    })
})
//on click function to swap still and active gifs
$('.gif').on('click', '#gifActive', function(){
    let src = $(this).attr('src');
    
    $(this).attr('src', $(this).attr('data-inactive'));

    $(this).attr('data-inactive', src);
    


})
