//購物專區
document.querySelector('.hover1').addEventListener('mouseenter', () => {
  document.querySelector('#shopping').src = 'image-index/shopping/img-shopping view1.png';
});

document.querySelector('.hover2').addEventListener('mouseenter', () => {
  document.querySelector('#shopping').src = 'image-index/shopping/img-shopping view2.png';
});

document.querySelector('.hover3').addEventListener('mouseenter', () => {
  document.querySelector('#shopping').src = 'image-index/shopping/img-shopping view3.png';
});


//banner
const img1 = document.getElementById('TW-world-1');
const img2 = document.getElementById('TW-world-2');
const img3 = document.getElementById('TW-world-3');
const img4 = document.getElementById('TW-world-4');
const hoverTW = document.querySelector('.btn-TW');
const hoverWorld = document.querySelector('.btn-world');

// 自動輪播圖片清單
const R1 = ['image-index/banner/img-view1.jpg', 'image-index/banner/img-view5.jpg'];
const R2 = ['image-index/banner/img-view2.jpg', 'image-index/banner/img-view6.jpg'];
const R3 = ['image-index/banner/img-view3.jpg', 'image-index/banner/img-view7.jpg'];
const R4 = ['image-index/banner/img-view4.jpg', 'image-index/banner/img-view8.jpg'];

let index = 0;
let intervalId;
let isHovering = false;

// 自動切換圖片的函數
function startAutoSwitch() {
  intervalId = setInterval(() => {
    if (!isHovering) {
      index = (index + 1) % R1.length;
      img1.src = R1[index];
      img2.src = R2[index];
      img3.src = R3[index];
      img4.src = R4[index];
    }
  }, 3000);
}

// 停止輪播
function stopAutoSwitch() {
  clearInterval(intervalId);
}


hoverTW.addEventListener('mouseenter', () => {
  isHovering = true;
  img1.src = 'image-index/banner/img-view1.jpg';
  img2.src = 'image-index/banner/img-view2.jpg';
  img3.src = 'image-index/banner/img-view3.jpg';
  img4.src = 'image-index/banner/img-view4.jpg';
});
// 離開 Hover 時恢復輪播
hoverTW.addEventListener('mouseleave', () => {
  isHovering = false;
  // 恢復目前的輪播圖
  img1.src = R1[index];
  img2.src = R2[index];
  img3.src = R3[index];
  img4.src = R4[index];  
});

hoverWorld.addEventListener('mouseenter', () => {
  isHovering = true;
  img1.src = 'image-index/banner/img-view5.jpg';
  img2.src = 'image-index/banner/img-view6.jpg';
  img3.src = 'image-index/banner/img-view7.jpg';
  img4.src = 'image-index/banner/img-view8.jpg';
});
// 離開 Hover 時恢復輪播
hoverWorld.addEventListener('mouseleave', () => {
  isHovering = false;
  img1.src = R1[index];
  img2.src = R2[index];
  img3.src = R3[index];
  img4.src = R4[index]; 
});

// 初始化
startAutoSwitch();