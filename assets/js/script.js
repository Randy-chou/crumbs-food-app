// Cookie breaking upon click functionality
var titleimg = $("#title");
var cookiestate = 0;

function breakcookie(){
    switch(cookiestate) {
        case 0:
            $(this).attr("src","./assets/images/title_2.png");
            cookiestate++;
          break;
        case 1:
            $(this).attr("src","./assets/images/title_3.png");
            cookiestate++;
          break;
        default:
      }
}

titleimg.on("click", breakcookie);

//Navbar functionality
var recipebutton = $("#recipebutton");

function showrecipes(event){
    event.preventDefault();
    $("#history_modal").addClass("is-active");
}

recipebutton.on("click",showrecipes);

//Recipe search bar functionality
var tagsbutton = $(".tagsbutton");
var searchform = $("#search_form");
var searchformpost = $("#search_form_post");
var quitbutton = $(".quitbutton");

function searchrecipes(event){
    event.preventDefault();
    event.stopPropagation();
    var searchbar = $("#searchbar");
    var searchbar_post = $("#searchbar_post");
    var tags = [];
    var userInput = "";

    //Grab search bar value depending on what searchbar is used
    if($(searchbar).val()){
        userInput = $(searchbar).val();
        $(searchbar).val("");
    }else if($(searchbar_post).val()){
        userInput = $(searchbar_post).val();
        $(searchbar_post).val("");
    }else{
        return;
    }
    console.log(userInput)

    //Grab checked tags
    $("#tagsbox").children().each(function(index){
        if($(this).children("input")[0].checked){
            tags.push($(this).attr("value"));
        }
    })

    //API call
    newUrl = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=" + tags.join(" ")  +"&q=" + userInput;
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": newUrl,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b86865e28bmsha53eeb88dffe2d3p19b1fajsnd5a35513a90e",
            "x-rapidapi-host": "tasty.p.rapidapi.com"
        }
    };
    $.ajax(settings).done(function (response) {
        //For each returned recipe object make a list item
        $(response.results).each(function(index){
            var elName = this.name;
            var elId = this.id;
            var newEl = $('<li>'+ elName +'</li>');
            if(index < 10){
                $("#left-list").append(newEl);
            }else{
                $("#right-list").append(newEl);
            }
        })
    });
}


function showtags(event){
    event.preventDefault();
    event.stopPropagation();
    $("#search_modal").addClass("is-active");
}

function exitmodal(event){
    console.log("here");
    $(event.target).parent().parent().parent().removeClass("is-active");
}

searchform.on("submit", searchrecipes);
searchformpost.on("submit", searchrecipes);
tagsbutton.on("click", showtags);
quitbutton.on("click", exitmodal)