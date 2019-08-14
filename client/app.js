
$('.textSubmit').on('submit', function(e) {
  e.preventDefault();

  try {
    JSON.parse($('.submitText').val());
    fetch('http://localhost:3000/text', {
      method: 'POST',
      body: $('.submitText').val(),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.text();
      })
      .then(text => {
        $('.csvText').val(text);
      })
      .catch(err => {
        console.log('error: ', err);
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

  // $.ajax({
  //   url: 'http://localhost:3000/file',
  //   type: 'POST',
  //   data: formData,
  //   cache: false,
  //   contentType: false,
  //   processData: false,
  //   success: function(data) {
  //     if (Object.keys(data).length) {
  //       $('.csvText').val(data);
  //     } else {
  // $('.message').html('ERROR: file must be in JSON format');
  //     }
  //   }
  // });
  fetch('http://localhost:3000/file', {
    method: 'POST',
    body: formData,
  }).then(response =>{
    return response.text();
  }).then(text => {
    if (text === '{}') {
      $('.message').html('ERROR: file must be in JSON format');
    } else {
      $('.csvText').val(text);
    }
  }).catch(err => {
    console.log('ERRRRRRRRRRROOR: ', err);
  });
});

$('.downloadBtn').on('click', function(e) {
  let fileName = prompt('Save file as');
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

var fetchTest = () => {
  fetch('http://localhost:3000/text', {
    method: 'POST',
    body: $('.submitText').val(),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.text();
  }).then(text => {
    console.log(text);
  });
};

