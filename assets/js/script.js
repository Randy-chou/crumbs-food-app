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
var tagsbutton = $("#tagsbutton");
var searchform = $("#search_form");
var quitbutton = $(".quitbutton");

function searchrecipes(event){
    event.preventDefault();
    var searchbar = $("#searchbar");

    var userInput = $(searchbar).val()
    var tags = [];

    $("#tagsbox").children().each(function(index){
        if($(this).children("input")[0].checked){
            tags.push($(this).attr("value"));
        }
    })

    console.log(tags);
    console.log(tags.join(" "));
}

function showtags(event){
    event.preventDefault();
    $("#search_modal").addClass("is-active");
}

function exitmodal(event){
    console.log("here");
    $(event.target).parent().parent().parent().removeClass("is-active");
}

searchform.on("submit", searchrecipes);
tagsbutton.on("click", showtags);
quitbutton.on("click", exitmodal)