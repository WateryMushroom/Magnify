//left
var obj_left      = document.getElementById("Left");
var obj_mask 	  = document.getElementById("Mask");
var obj_large     = document.getElementById("Large");
var obj_large_img = document.getElementById("LargeImg");
 
obj_left.onmouseenter = function () {
	obj_mask.style.display = obj_large.style.display = "block";
}

obj_left.onmouseleave = function () {
	obj_mask.style.display = obj_large.style.display = "none";
}

obj_left.onmousemove = function (e) {
	var e = e || event;

	//计算mask中心（不是鼠标）在容器内的位移量
	var l = e.clientX - obj_left.offsetLeft - obj_mask.offsetWidth / 2;
	var t = e.clientY - obj_left.offsetTop - obj_mask.offsetHeight / 2;

	//限定mask中心（不是鼠标）在容器内不得超出边界 
	if (l < 0) l = 0; 
	if (l > obj_left.offsetWidth - obj_mask.offsetWidth) l = obj_left.offsetWidth - obj_mask.offsetWidth; 
	if (t < 0) t = 0; 
	if (t > obj_left.offsetHeight - obj_mask.offsetHeight) t = obj_left.offsetHeight - obj_mask.offsetHeight;

	//无需设置mask中心
	obj_mask.style.left = l  + "px";
	obj_mask.style.top  = t  + "px";

	//计算比例 宽度差之比
	var ratio = (obj_large_img.offsetWidth - obj_large.offsetWidth) / (obj_left.offsetWidth - obj_mask.offsetWidth);

	//位移方向相反 
	obj_large_img.style.left = -1 * l * ratio + "px";
	obj_large_img.style.top  = -1 * t * ratio + "px";
}



//right
var obj_right     = document.getElementById("Right");
var obj_magnifier = document.getElementById("Magnifier");
var obj_native    = document.getElementById("Native");
var native_width  = 0;

var image = new Image();
image.src = obj_native.src;
native_width = image.width;

obj_right.onmouseenter = function () {
	obj_magnifier.style.display = "block";
}

obj_right.onmouseleave = function () {
	obj_magnifier.style.display = "none";
}

obj_right.onmousemove = function (e) {
	var e = e || event;

	//计算鼠标（不是magnifier中心）在容器内的位移量
	var l = e.clientX - obj_right.offsetLeft;
	var t = e.clientY - obj_right.offsetTop;

	//限定鼠标（不是magnifier中心）在容器内不得超出边界 
	if (l < 0) l = 0; 
	if (l > obj_right.offsetWidth) l = obj_right.offsetWidth; 
	if (t < 0) t = 0; 
	if (t > obj_right.offsetHeight) t = obj_right.offsetHeight;

	//需要设置magnifier中心
	obj_magnifier.style.left = l - obj_magnifier.offsetWidth / 2 + "px";
	obj_magnifier.style.top  = t - obj_magnifier.offsetHeight / 2 + "px";	

	//计算比例 宽度之比
	var ratio = native_width / obj_right.offsetWidth; 

	//位移方向相反 
	var rx = -1 * (l * ratio - obj_magnifier.offsetWidth / 2);
	var ry = -1 * (t * ratio - obj_magnifier.offsetHeight / 2);
	obj_magnifier.style.backgroundPosition = rx + "px " + ry + "px";
}