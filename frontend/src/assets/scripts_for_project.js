(function() {
  const headings = document.querySelectorAll('h5');
  Array.prototype.forEach.call(headings, h => {
    let btn = h.querySelector('button');
    let target = h.nextElementSibling;
    btn.onclick = () => {
      let expanded = btn.getAttribute('aria-expanded') === 'true';
      /*document.querySelector('.col-md-9').style.backgroundColor = '#f0f0f0';*/
      btn.setAttribute('aria-expanded', !expanded);
      target.hidden = expanded;
    }
  });
})()
function showDiv() {
  document.getElementById("div1").style.display = "block";
}

function hideDiv() {
  document.getElementById("div1").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("close-button").addEventListener("click", hideDiv);
});


function toggle() {
  var div = document.getElementById('pnlTest');
  if(this.checked)
    div.style.display = 'block';
  else
    div.style.display = 'none'
}
document.getElementById('chkTest').onchange = toggle;
