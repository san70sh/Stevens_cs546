$('#phraseForm').submit((event) => {
    event.preventDefault();
    let phrase = $('#phrase').val()
    if(phrase.length == 0 || phrase ==  undefined) {
        $("#err").show();
        $('#err').html('Please enter a value');
        $('#phraseForm').trigger('reset');
        $('#phrase').focus();
		$('#phrase').value= "";
    } else {
        let re = /[^a-z0-9]/gi;
        let anString = phrase.replace(re,"");
        if(anString){
            $("#err").hide();
            let re = /[^a-z0-9]/gi;
            anString = anString.toLowerCase();
            let revString = anString.split('').reverse().join('');
            let li = '';
            if(revString === anString) {
                li = `<li class="is-palindrome">${phrase} </li>`;
            } else {
                li = `<li class="not-palindrome">${phrase} </li>`;  
            }
            $('#attempts').append(li);
            $("#attempts").show();
            $('#phraseForm').trigger('reset');
            $('#phrase').focus();
        } else {
            $("#err").show();
            $('#err').html('The string must contain alphanumeric characters only.');
            $('#phraseForm').addClass('error');
            $('#phrase').focus();
            $('#phrase').value= "";
        }
    }
})