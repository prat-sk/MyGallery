//====================MenuFunction=======================================
document.getElementById('icon_reader').addEventListener('click',menuFunction);

function menuFunction() {
    document.getElementById("menu_list").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('#icon_reader')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}