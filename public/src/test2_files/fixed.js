  $(document).ready(function() {
    if (window.location.hash && $(window.location.hash).length > 0) {
        $('html, body').animate({
            scrollTop: $(window.location.hash).offset().top -210
        }, 1); 
    } 

    $('#advancedrider li.indentmenu a').click(handleClick); 
    $('#beginning li#beginning a').click(handleClick);
    $('#returning li#returning a').click(handleClick);
    $('#learndirt li#learndirt a').click(handleClick); 
    $('#faq li a').click(handleClick); 
   
    
    function handleClick(event) { 
        event.preventDefault();
       var identification = event.currentTarget.hash;
       $('html, body').animate({
            scrollTop: $(identification).offset().top - 210
       }, 1);
    }  
}); 

