var lowercase = "abcdefghijklmnopqrstuvwxyz";
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var symbols = "!@#$%&*_+~|}{[]\:;?,./-= ";

function generatePassword() {
	var length = Number($( "#passwordLength option:selected" ).text());
	
	var charset = "";
	
	if ($("#checkLower" ).prop('checked')) {
		charset += lowercase;
	}
	if ($("#checkUpper" ).prop('checked')) {
		charset += uppercase;
	}
	if ($("#checkNumbers" ).prop('checked')) {
		charset += numbers;
	}
	if ($("#checkSymbols" ).prop('checked')) {
		charset += symbols;
	}

    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
	
    $('#pwOutput').val(retVal);
	
	if ($("#checkCopy" ).prop('checked')) {
		copyTextToClipboard(retVal);
	}
	
    return retVal;
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
