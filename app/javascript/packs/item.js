$(function(){
  $('.accordion-title').click(function(){
    $(this).next('.accordion-content').slideToggle();
    $(this).toggleClass("open");
  });
});