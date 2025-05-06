window.onload = function() {
    startAnimation();
};

function startAnimation() {
    var elem = document.getElementById("logo"); 
    var pos = 0; 
    var direction = 1; // 1 for right, -1 for left
    var id = setInterval(frame, 10); 
    
    elem.addEventListener('click', function() {
        clearInterval(id);
    });

    function frame() { 
        if (pos >= 350 || pos <= 0) { 
            direction *= -1; // Change direction
        }
        pos += direction; 
    } 
}