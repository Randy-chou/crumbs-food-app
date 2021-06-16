

// this function hides certain aspects of the web page
$(document).ready(function(){
    $(`#submitbutton`).on(`click`, function(){
        $(`#bookleft,#bookright,#feed`).toggle(4000);
    });
    $(`#bookleft,#bookright,#feed`).hide();
    
    
    $(`#submitbutton`).on(`click`, function(){
        $(`#coverbook`).toggle(1000);
    });
    $(`#coverbook`).show();
    
    });
    