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
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${input}&api_key=t3X8WSh5UuP13eOL33cqlZmOKV3kFp0W`;
    
    $.ajax({
        URL: queryURL,
        method: 'GET'
    }).then(function(response){
            console.log(response);
            $('.gif').append(JSON.stringify(response));
    })



})

