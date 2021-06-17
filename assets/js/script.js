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

    //Grab checked tags
    $("#tagsbox").children().each(function(index){
        if($(this).children("input")[0].checked){
            tags.push($(this).attr("value"));
        }
    })

    //API call
    newUrl = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=30&tags=" + tags.join(" ")  +"&q=" + userInput;
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
        $("#left-list").html("");
        $("#right-list").html("");

        //Keep track of how many li elements have been added
        var count = 0;

        $(response.results).each(function(index){
            var elName = this.name;
            var elId = this.id;

            //Check if this object is actually a recipe and not an article
            if (this.hasOwnProperty("num_servings")) {
                var newEl = $('<li>' + elName + '</li>');
                newEl.attr("value", elId);
                if (count < 10) {
                    $("#left-list").append(newEl);
                } else if(count < 20){
                    $("#right-list").append(newEl);
                }
                count++;
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

//Instructions and Ingredients

//Event delegation to make listed recipes clickable
function getMoreInfo(event){
    event.preventDefault;
    var targetEl = event.target;

    //Check if target element is a list item
    if(!($(targetEl).is("li"))){
        return;
    }

    //If element is a list item, place its id value into the API url
    newUrl="https://tasty.p.rapidapi.com/recipes/detail?id="+$(targetEl).val();

    //API call
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
        console.log(response);
        $("#recipe-name").html(response.name);

        // Clear previously entered information
        $("#instructions").html("");
        $("#ingredients-list").html("");

        // Loop through response and add instructions and ingredients
        $(response.instructions).each(function(){
            var newEl = $('<li>' + this.display_text + '</li>')
            $("#instructions").append(newEl);
        });
        $(response.sections).each(function(){
            if (this.name != null) {
                var newEl = $('<li>' + this.name+ '</li>');
                newEl.addClass("mainItem");
                $("#ingredients-list").append(newEl);
            }
            $(this.components).each(function(){
                var newIng = $('<li>' + this.ingredient.display_singular + '</li>');
                newIng.addClass("ingredient");
                $("#ingredients-list").append(newIng);
            })
        })
    });
}


searchform.on("submit", searchrecipes);
searchformpost.on("submit", searchrecipes);
tagsbutton.on("click", showtags);
quitbutton.on("click", exitmodal)
$("#left-list").on("click", getMoreInfo)
$("#right-list").on("click", getMoreInfo)
$("#ingredients-list").on("click", getNutrition)