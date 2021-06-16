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