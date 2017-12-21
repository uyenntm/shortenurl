
function SelectText(element) {
    var doc = document;
    var text = doc.getElementById(element);    
    if (doc.body.createTextRange) { // ms
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

$(document).ready(function () {
    $('#tooltip').text('Press ⌘ + C copy');
   //textfield clicked
   $('input[type="text"]').each(function(){
    
        $(this).focus(function(){
           
          $(this).addClass('input-focus');
        });
    
        $(this).blur(function(){
          $(this).removeClass('input-focus');
        });
    
      });
      //onclick to shorten URL
    $('#btn').click(function(){
        //shorten URL
        if($('#btn').text() == "Shorten URL"){
            let inputURL = $('#input-url').val();
            let shortenURL ="";
            //TODO: shorten URL algorithm
            //no empty input
            if(inputURL !=""){
                $.ajax({
                    url: '/api/shorten',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {url: $('.url-field').val()},
                    success: function(data){
                        // display the shortened URL to the user that is returned by the server
                        shortenURL = data.shortUrl;
                        
                        $('#shorten-display-container').html(shortenURL);
                        $('#shorten-display-container').hide().fadeIn('slow');
    
                        SelectText("shorten-display-container");
                        
                        //change text of the button
                        if($('#shorten-display-container').text() !==""){
                            $('#btn').text('Copy');
                        }    
                    }
                  });
            }
             
        }

        //copy url
       else if($('#btn').text() == "Copy"){
          //  $('#shorten-display-container').attr('data-tooltip','Copied!');
          $("#tooltip").show("fast");
          $('#tooltip').text('Copied!');
          //copy to clipboard
         // $('#shorten-display-container').select();
          document.execCommand("Copy");
         // alert("Copied the text: " +  $('#input-url').val());
        }
       
    });
    $(document).on('keydown', function ( e ) {
        // You may replace `c` with whatever key you want
        if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'c') ) {
            console.log( "You pressed CTRL + C" );
          //  $('#input-url').select();
            document.execCommand("Copy");
           
            $("#tooltip").show("fast");
            $('#tooltip').text('Copied!');
            SelectText("shorten-display-container");
        }
    });
    //hover shorten url display tooltips
    $('#shorten-display').hover(function(){
        if($('#shorten-display-container').text() !==""){
            $("#tooltip").show("fast");
           
        }
    },function(){
        $("#tooltip").hide("fast");
    }
);
   
});
