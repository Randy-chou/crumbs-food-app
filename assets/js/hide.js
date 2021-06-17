

// this function hides certain aspects of the web page
$(document).ready(function () {
    $(`#submitbutton`).on(`click`, function () {
        if($(searchbar).val()){
            $(`#bookleft,#bookright,#feed`).toggle(4000);
        }
    });
    $(`#bookleft,#bookright,#feed`).hide();


    $(`#submitbutton`).on(`click`, function () {
        if($(searchbar).val()){
            $(`#coverbook`).toggle(1000);
        }
    });
    $(`#coverbook`).show();

    $(`.recipe-list`).on(`click`, function (event) {
        var targetEl = event.target;
        if(!($(targetEl).is("li"))){
            return;
        }
        $(`#bookleft_post,#bookright_post,#feed_post`).toggle(4000);
    });
    $(`#bookleft_post,#bookright_post,#feed_post`).hide();

    $(`.recipe-list`).on(`click`, function (event) {
        var targetEl = event.target;
        if(!($(targetEl).is("li"))){
            return;
        }
        $(`#bookleft,#bookright,#feed`).toggle(4000);
    });
    $(`#bookleft,#bookright,#feed`).hide();

    $(`#backrecipe`).on(`click`, function () {
        $(`#bookleft_post,#bookright_post,#feed_post`).toggle(4000);
    });
    $(`#bookleft_post,#bookright_post,#feed_post`).hide();

    $(`#backrecipe`).on(`click`, function () {
        $(`#bookleft,#bookright,#feed`).toggle(4000);
    });
    $(`#bookleft,#bookright,#feed`).hide();
});

