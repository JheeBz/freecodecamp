$(".navbar-nav li a").click(function() {
    $(".navbar-nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});