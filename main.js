// tinyMCE
tinymce.init({
  selector: '#descriptioninput'
});

// input section
var loadFile = function() {
  var reader = new FileReader();
  var image = document.getElementById('image');
  reader.onload = function(){
    image.src = reader.result;
  };
  reader.readAsDataURL(document.getElementById("fileinput").files[0]);
};
      
var updateHeader = function() {
  var header = document.getElementById('header');
  header.innerHTML = document.getElementById('headerinput').value;
};
   

var updateDescription = function() {
var content = tinymce.get('descriptioninput').getContent();
var description = document.getElementById('description');
  description.innerHTML = content;
};
      
// Trigger File Input-Dialog
document.getElementById("fileinput").style.display = "block";
document.getElementById("fileinput").click();

// HTML2PDF
const options = {
  filename: 'filen-name.pdf',
  image: {
    type: 'jpeg',
    quality: 0.98
  },
  // https://stackoverflow.com/questions/31309331/html2pdf-has-blurry-pdf-output
  html2canvas: {
    dpi: 192,
    scale: 4,
    letterRendering: true,
    useCORS: true
  },
  jsPDF: {
    unit: 'px',
    format: [500, 500]
  }
};
setupDownloadPdf();
function setupDownloadPdf() {
  document.getElementById('downloadPdf').addEventListener('click', function() {
    const element = document.querySelector('.output-wrapper');
    html2pdf().from(element).set(options).save();
  });
};

// HTML2CANVAS

setupDownloadPng();
function setupDownloadPng() {
  document.getElementById('downloadPng').addEventListener('click', function() {
    html2canvas(document.querySelector('.output-wrapper')).then(function(canvas) {
      simulateDownloadImageClick(canvas.toDataURL(), 'file-name.png');
    });
  });
};

function simulateDownloadImageClick(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download !== 'string') {
    window.open(uri);
  } else {
    link.href = uri;
    link.download = filename;
    accountForFirefox(clickLink, link);
  }
}

function clickLink(link) {
  link.click();
}

function accountForFirefox(click) { // wrapper function
  let link = arguments[1];
  document.body.appendChild(link);
  click(link);
  document.body.removeChild(link);
}


