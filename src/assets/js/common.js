//移动端自动适应
function change(){
	document.documentElement.style.fontSize=16 * document.documentElement.offsetWidth / 320 +"px";
}
window.addEventListener('resize',change,false);