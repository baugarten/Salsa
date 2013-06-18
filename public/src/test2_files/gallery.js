jQuery(document).ready(function($) {
    if ($('#thumbs').length >0) {
    var gallery = $('#thumbs').galleriffic({
        delay:                     3000, // in milliseconds
        numThumbs:                 20, // The number of thumbnails to show page
        preloadAhead:              40, // Set to -1 to preload all images
        enableTopPager:            false,
        enableBottomPager:         true,
        maxPagesToShow:            7,  // The maximum number of pages to display in either the top or bottom pager
        imageContainerSel:         '#slideshow', // The CSS selector for the element within which the main slideshow image should be rendered
        controlsContainerSel:      '', // The CSS selector for the element within which the slideshow controls should be rendered
        captionContainerSel:       '', // The CSS selector for the element within which the captions should be rendered
        loadingContainerSel:       '', // The CSS selector for the element within which should be shown when an image is loading
        renderSSControls:          false, // Specifies whether the slideshow's Play and Pause links should be rendered
        renderNavControls:         false, // Specifies whether the slideshow's Next and Previous links should be rendered
        playLinkText:              'Play',
        pauseLinkText:             'Pause',
        prevLinkText:              'Previous',
        nextLinkText:              'Next',
        nextPageLinkText:          'Next &rsaquo;',
        prevPageLinkText:          '&lsaquo; Prev',
        enableHistory:             false, // Specifies whether the url's hash and the browser's history cache should update when the current slideshow image changes
        enableKeyboardNavigation:  true, // Specifies whether keyboard navigation is enabled
        autoStart:                 false, // Specifies whether the slideshow should be playing or paused when the page first loads
        syncTransitions:           false, // Specifies whether the out and in transitions occur simultaneously or distinctly
        defaultTransitionDuration: 1000, // If using the default transitions, specifies the duration of the transitions
        onSlideChange:             undefined, // accepts a delegate like such: function(prevIndex, nextIndex) { ... }
        onTransitionOut:           undefined, // accepts a delegate like such: function(slide, caption, isSync, callback) { ... }
        onTransitionIn:            undefined, // accepts a delegate like such: function(slide, caption, isSync) { ... }
        onPageTransitionOut:       undefined, // accepts a delegate like such: function(callback) { ... }
        onPageTransitionIn:        undefined, // accepts a delegate like such: function() { ... }
        onImageAdded:              undefined, // accepts a delegate like such: function(imageData, $li) { ... }
        onImageRemoved:            undefined  // accepts a delegate like such: function(imageData, $li) { ... }
        
    });
    } 
    
    var open=false;  
    var current; 
    var chooser=function(namey) {
        current=namey;
        $('#overlay div').each(function(index, lonelydiv) {
           if ($(lonelydiv).attr('class') === namey) {
                $(lonelydiv).show();
    
           } else {
              $(lonelydiv).hide(); 
           } 
        }); 
    } 
                               
    $('#foroverlay a').click(function(event) {
        $(event.currentTarget).attr('id');
        if (open==false) {
            $('#overlay').show();
            open=true;
            $('.shadowoverlay').show(); 
            chooser($(event.currentTarget).attr('id')); 
            $('#arrow-right').off().click(function(event) {
                if ($('.' + current).next('div').length > 0) {
                    chooser($('.' + current).next('div').attr('class'));
                } else {
                    chooser('overstandard'); 
                }
            });
            
            $('#arrow-left').off().click(function(event) {
                if ($('.' + current).prev('div').length > 0) {
                chooser($('.' + current).prev('div').attr('class'));
                } else {
                    chooser('oversidecar');
                }
            }); 
            
            $('#overlay').click(function(event) {
                event.preventDefault(); 
                event.stopPropagation();
            }); 
            $('.shadowoverlay').click(function(event) {
                $('.shadowoverlay').hide(); 
                open=false; 
            });
            
        }    
     }); 
});












