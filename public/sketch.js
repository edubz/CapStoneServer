var socket=io.connect('http://localhost:3000');


function setup(){
		var slider= createSlider();
		slider.input(reportValue);
}

function reportValue(){  
	var val = this.value();
    socket.emit('report', val);

}