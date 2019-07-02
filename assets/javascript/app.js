let searchTerms = ['matrix', 'shrek', 'deadpool'];





//appends a button for each object in search terms array
for (let i = 0; i < searchTerms.length; i++) {
    let buttons = $('<button>');
    buttons.text(searchTerms[i]);
    buttons.attr('data-name', searchTerms[i]);
    $('.buttons').append(buttons);
}

$('button').on('click', function(){
    //get the data attribute for the button clicked
    let input = $(this).attr('data-name');
    //api key for giphy t3X8WSh5UuP13eOL33cqlZmOKV3kFp0W
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${input}&api_key=t3X8WSh5UuP13eOL33cqlZmOKV3kFp0W&limit=10`;
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
            console.log(response);
            let results = response.data;
        for (let i = 0; i < results.length; i++) {
                let gifDiv = $('<Div>');
                console.log(results[i].images.fixed_height.url);
                let rating = results[i].rating;
                //sets up a element with the rating to be appended later
                let p = $('<p>');
                p.text(`Rating: ${rating}`);
                //sets up a element with the gif image to be appended later
                let gif = $('<img>');
                gif.attr('src', results[i].images.fixed_height.url);
            //append both new elements
                gifDiv.append(p).append(gif);
                $('.gif').prepend(gifDiv);
        }
    })



})

