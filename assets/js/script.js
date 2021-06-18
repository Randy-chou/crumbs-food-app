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
    displayMyRecipes();
}

recipebutton.on("click", showrecipes);

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
                //According to how many li elements have been added, determine which book side to add the newly created li element.
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

//Get Instructions and Ingredients for clicked recipe
function getMoreInfo(event){
    event.preventDefault;
    var targetEl = event.target;
    currentRecipe.name = $(targetEl).html();
    currentRecipe.id = $(targetEl).val();
    //Check if target element is a list item
    if(!($(targetEl).is("li"))){
        return;
    }

    //If element is a list item, place its id value into the API url
    newUrl="https://tasty.p.rapidapi.com/recipes/detail?id="+ $(targetEl).val();

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
//My recipes 
var myRecipes = document.getElementById("myRecipeList");

currentRecipe = {
    name: "",
    id: ""
};

var storedName = localStorage.getItem('recipeArray');
if (storedName != null) {
    var recipeArray = JSON.parse(storedName);
} else {
    var recipeArray = [];
};;

function setRecipe() {
    recipeObject = {name: currentRecipe.name , id: currentRecipe.id};
    recipeArray.push(recipeObject);
    console.log(recipeArray);
    localStorage.setItem('recipeArray', JSON.stringify(recipeArray));


};

function displayMyRecipes(){
    console.log(recipeArray);
    myRecipes.innerHTML = '';

    $(recipeArray).each(function(){
        var newRecipe = $('<li>' + this.name + '</li>');
        newRecipe.attr("value", this.id);
        $(myRecipes).append(newRecipe);

       
    });
};

//Get nutritional info for clicked ingredient
function getNutrition(event){
    var targetEl = event.target;

    if(!$(targetEl).hasClass("ingredient")){
        return;
    }

    var newUrl = "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=" + $(targetEl).html();

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": newUrl,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b86865e28bmsha53eeb88dffe2d3p19b1fajsnd5a35513a90e",
            "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.hints.length > 0){
            var item = response.hints[0].food;
            $("#nutrition-title").html(item.label);
            $("#cbd").html(item.nutrients.CHOCDF.toFixed(4));
            $("#nrg").html(item.nutrients.ENERC_KCAL.toFixed(4));
            $("#fat").html(item.nutrients.FAT.toFixed(4));
            $("#fbr").html(item.nutrients.FIBTG.toFixed(4));
            $("#prt").html(item.nutrients.PROCNT.toFixed(4));
        }
    });
}

$("#myRecipeList").on('click', displayMyRecipes)
$("#saverecipe").on('click', setRecipe)
searchform.on("submit", searchrecipes);
searchformpost.on("submit", searchrecipes);
tagsbutton.on("click", showtags);
quitbutton.on("click", exitmodal)
$("#left-list").on("click", getMoreInfo)
$("#right-list").on("click", getMoreInfo)
$("#ingredients-list").on("click", getNutrition)