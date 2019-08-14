
$('.textSubmit').on('submit', function(e) {
  e.preventDefault();

  try {
    JSON.parse($('.submitText').val());
    $.ajax({
      url: 'http://localhost:3000/text',
      type: 'POST',
      data: $('.submitText').val(),
      contentType: 'application/json',
      success: function(data) {
        $('.csvText').val(data);
        console.log('data', data);
      }
    });
    console.log($('.submitText').val());
  } catch (err) {
    $('.message').html('ERROR: text must be in JSON format');
  }

});

$('.fileSubmit').submit('submit', function(e) {
  e.preventDefault();
  var formData = new FormData();
  formData.append('file', $('.file')[0].files[0] );

  $.ajax({
    url: 'http://localhost:3000/file',
    type: 'POST',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data) {
      if (Object.keys(data).length) {
        $('.csvText').val(data);
      } else {
        $('.message').html('ERROR: file must be in JSON format');
      }
    }
  });
});

$('.downloadBtn').on('click', function(e) {
  let fileName = prompt('Save file as');
  // $(this).attr('download', 'test' + '.csv');
  // $(this).attr('href', 'data:text/csv;base64,' + btoa($('.csvText').val()));
  save(fileName); 
});

var save = (fileName) => {
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/csv;base64,' + btoa($('.csvText').val()));
  a.setAttribute('download', fileName + '.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

