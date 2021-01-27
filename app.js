const canvas = document.querySelector(".jsCanvas");
const mode = document.querySelector(".jsMode");
const save = document.querySelector(".jsSave");
const colors = document.getElementsByClassName("jscolor");
const range = document.getElementById("jsRange");

const ctx = canvas.getContext("2d"); //how we manipulate pixels inside canvas
//set default
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height); //fill white as default
ctx.strokeStyle = "#000000";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(event) {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); //just creating path when not clicking
    ctx.moveTo(x, y);
    0;
  } else {
    ctx.lineTo(x, y); //전 위치에서 현재 위치까지 선을 긋는다.
    ctx.stroke();
  }
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault(); //마우스 우클릭 금지
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); //마우스 우클릭 금지
}

//색깔변환

function handleColorClick(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}
//Array.from:create Array from iterable object.
Array.from(colors).forEach((color) => {
  color.addEventListener("click", handleColorClick);
});

//굵기변환

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}
if (range) {
  range.addEventListener("input", handleRangeChange);
}

//모드 변환
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

//save
function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS🎨"; //download : a attribute
  link.click();
}
if (save) {
  save.addEventListener("click", handleSaveClick);
}
