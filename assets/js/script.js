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