
$(document).ready(function () {
  //     $( ".show_btn" ).click(function() {
  // 		$(".lightbox").toggle(); 
  // 	}); 

});

var canvas = document.getElementById('signature-pad');

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

var signaturePad = new SignaturePad(canvas, {
  backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

var is = false;

document.getElementById('to-png').addEventListener('click', function () {
  if (signaturePad.isEmpty()) {
    is = false;
  }else{
    is = true;
  }


  var data = signaturePad.toDataURL('image/png');
  console.log(data);
  $("#img").attr("src",data);
});


document.getElementById('clear').addEventListener('click', function () {
  signaturePad.clear();
});

document.getElementById('submit').addEventListener('click', function () {
  if(is){
    alert('可送出');
  }else{
    alert('請先簽名');
  }
});

// --------------------------------------


// $('#click').on('click',function(){
//   $("#img").attr("src",convertCanvasToImage(canvas));
// });

// function convertCanvasToImage(canvas) {
// 	var image = new Image();
// 	image.src = canvas.toDataURL("image/png");
// 	return canvas.toDataURL("image/png");
// }