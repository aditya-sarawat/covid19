let i = 0;
let count = 0;
let placeholder = "";
let text = ["Delhi    ", "Maharashtra    ", "Tamil Nadu    ",
				 "Assam    ", "Gujrat    ", "Punjab    ", "Kerala    "];

function type() {
	placeholder += text[count].charAt(i);
	document.getElementById("placeholder").setAttribute("placeholder", placeholder);
	i++;
	
	if (i == text[count].length && count <= 5) {
		i = 0;
		count++;
		placeholder = "";
		if (count == 5) {
			count = 0;
		}
	}
	setTimeout(type, 400);
}

type();