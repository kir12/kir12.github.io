$(document).ready(function(){
    $("#mainM").hover(function(){
        $("#main").css("background-color", "yellow");
        }, function(){
        $("#main").css("background-color", "white");
    });
    $("#varM").hover(function(){
        $("#var").css("background-color", "pink");
        }, function(){
        $("#var").css("background-color", "white");
    });
});
