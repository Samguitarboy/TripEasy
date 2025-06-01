var myImage = document.querySelector('btn-TW');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/iphone13.jpg') {
      myImage.setAttribute ('src','image-index/banner/icon-TW.png');
    } else {
      myImage.setAttribute ('src','images/iphone13-1.jpg');
    }
}
