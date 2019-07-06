let searchTerms = ['justice league', 'deadpool', 'shrek', 'avengers'];





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
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${input}&api_key=t3X8WSh5UuP13eOL33cqlZmOKV3kFp0W`;

    //ajax call to the input URL to get database information and display it
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
            let results = response.data;
        for (let i = 0; i < 10; i++) {
                let gifDiv = $('<Div>');
                let rating = results[i].rating;
                //sets up a element with the rating to be appended later
                let p = $('<p>');
                p.text(`Rating: ${rating}`);
                //sets up a element with the gif image to be appended later
                let gif = $('<img>');
                gif.attr('src', results[i].images.fixed_height_still.url).attr('id', 'gifActive').attr('data-inactive', results[i].images.fixed_height.url);
                let favorite = $('<a>');
                favorite.text('Like');
                favorite.attr('href', '#').attr('data-inactive', results[i].images.fixed_height.url).attr('data-number', results[i].images.fixed_height_still.url).attr('data-id', i);
            //append both new elements
                gifDiv.append(p).append(gif).append(favorite);
                $('.gif').prepend(gifDiv);
        }
    });
});
//on click function to swap still and active gifs
$('.gif').on('click', '#gifActive', function(){
    let src = $(this).attr('src');
    
    $(this).attr('src', $(this).attr('data-inactive'));

    $(this).attr('data-inactive', src);
});
$('.gif').on('click', 'a', function(){
    $(this).toggleClass('active');
    
    if($(this).hasClass('active')){  
        let favoriteImg = $('<img>');
         favoriteImg.attr('src', $(this).attr('data-number')).attr('data-inactive', $(this).attr('data-inactive')).attr('data-id', $(this).attr('data-id'));
         $('.favorites').append(favoriteImg);
    }else{
        let removeImg = $(this).attr('data-id');
        $(`.favorites img[data-id="${removeImg}"]`).remove();
    }
});

//adds pausing functionality to favorited images
$('.favorites').on('click', 'img', function(){
    let src = $(this).attr('src');
    $(this).attr('src', $(this).attr('data-inactive'));

    $(this).attr('data-inactive', src);
});
