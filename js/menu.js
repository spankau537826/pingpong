var einspielerBtn = document.getElementById('einspielerBtn');
var zweispielerBtn = document.getElementById('zweispielerBtn');
var ubungBtn = document.getElementById('ubungBtn');
var c = 0;

function initialize(){
    einspielerBtn.style.display = 'none';
    zweispielerBtn.style.display = 'none';
    ubungBtn.style.display = 'none';
}

function pop(){
    if(c == 0){
        document.getElementById("box").style.display = "block";
        c = 1;
    }else{
        document.getElementById("box").style.display = "none";
        c = 0;
    }
}