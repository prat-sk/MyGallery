var imagegalleryarray=[];
//===================Show function====================================
function show(divID,slide) {

        var div = document.getElementById(divID);
        var currentDiv = document.getElementById(slide);

        currentDiv.style.display = "none";
        div.style.display = "block";

        currentDiv = div;
    }
    
load();

//===========================Read JSON======================================
var data;
var gallerydata;
function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
//======================Load User JSON=======================================
function load() {   
        loadJSON("JS/user.json", function(response) {
  
        var actual_JSON = JSON.parse(response);
        data=actual_JSON.user;
        //localStorage.setItem('data', data);
        // data=localStorage.getItem('data');
        
        if(JSON.parse(localStorage.getItem('user'))==undefined){
          localStorage.setItem('user', JSON.stringify(data));
        }
        data = JSON.parse(localStorage.getItem('user'));
        //console.log(user);
    });   
}

//====================Load Gallery JSON=======================================
function loadimages(){
        loadJSON("JS/gallery.json", function(response) {
  
        var actual_JSON = JSON.parse(response);
        gallerydata=actual_JSON.gallery;
        //console.log(gallerydata[0]);
        if(JSON.parse(localStorage.getItem('gallery'))==undefined){
          localStorage.setItem('gallery', JSON.stringify(gallerydata));
        }
        gallerydata = JSON.parse(localStorage.getItem('gallery'));
    });  
}
loadimages();


//==================Login Form=================================
document.getElementById('login_here').onclick=login_here;

function login_here(){
  document.getElementById('errormsg').innerHTML='';
  document.getElementById('login_form_div_id').style.display='block';
  document.getElementById('register_form_div_id').style.display='none';
} 


//==================Registration Form=================================
document.getElementById('register_here').onclick=register_here;

function register_here(){
  document.getElementById('registererrormsg').innerHTML='';
  document.getElementById('login_form_div_id').style.display='none';
  document.getElementById('register_form_div_id').style.display='block';
} 


//==================Register New User==================================

document.getElementById('register_form').onsubmit=register_user; 

function register_user(){
  document.getElementById('registererrormsg').innerHTML='';
  var username=document.getElementById('register_username').value;
  var password=document.getElementById('register_password').value;
  var confirm_password=document.getElementById('confirm_password').value;
  
  if(username=='' || password=='' || confirm_password==''){
    if(username==''){
      document.getElementById('registererrormsg').innerHTML+="Username ";
    }
    if(password==''){
      document.getElementById('registererrormsg').innerHTML+="Password ";
    }
    if(confirm_password==''){
      document.getElementById('registererrormsg').innerHTML+="Confirm password ";
    }
    document.getElementById('registererrormsg').innerHTML+="Should not be Empty";
    return false;
  }

  else {
    for (var i = 0; i < data.length; i++) {
    if(data[i].username==username){
      document.getElementById('registererrormsg').innerHTML+="Username Exist Already";
      return false;
    }
   }

   if(password!=confirm_password){
    document.getElementById('registererrormsg').innerHTML="Password and Confirm password should be same";
    return false;
   }

   var newuser={};

   newuser.username=username;
   newuser.password=password;
   newuser.galleryid=[];

   data.push(newuser);
   localStorage.setItem('user', JSON.stringify(data));
  }
  console.log(data);
  alert("Registered Successful");
  document.getElementById('errormsg').innerHTML='';
  document.getElementById('login_form_div_id').style.display='block';
  document.getElementById('register_form_div_id').style.display='none';
  return false;
}

//==================Check User Credentials and Display User page=============

document.getElementById('login_form').onsubmit=check_login;

// function check_login(){
//   data = JSON.parse(localStorage.getItem('user'));
//   //console.log(data);
//   var username=document.getElementById('username').value;
//   var password=document.getElementById('password').value;
//   var flag=true;

//   if(username=='' || password==''){
//     document.getElementById('errormsg').innerHTML='';
//     if(username==''){
//       document.getElementById('errormsg').innerHTML+="Username ";
//     }
//     if(password==''){
//       document.getElementById('errormsg').innerHTML+="Password ";
//     }
//     document.getElementById('errormsg').innerHTML+="Should not be Empty";
//     return false;
//   }
//   else {
//     for (var i = 0; i < data.length; i++) {
//     if(data[i].username==username && data[i].password==password){
//       var addbtnelem=document.createElement('button');
//       addbtnelem.setAttribute('class','btn_add_new_photo');
//       addbtnelem.setAttribute('id','add_photo');
//       addbtnelem.style.display='block';
//       addbtnelem.innerHTML="Add New Photo";
//       document.getElementById("userspan").appendChild(addbtnelem);


//       var formelem=document.createElement('form');
//       formelem.setAttribute('id','image_form'+i);
    
//       var formfileelem=document.createElement('input');
//       formfileelem.setAttribute('type','file');
//       formfileelem.setAttribute('name','filename');
//       formfileelem.setAttribute('id','imagefilename');
//       formelem.appendChild(formfileelem);

//        var formtextelem=document.createElement('textarea');
//       formtextelem.setAttribute('placeholder','description');
//       formtextelem.setAttribute('name','description');
//       formtextelem.setAttribute('id','description');
//       formelem.appendChild(formtextelem);

//       var formsaveelem=document.createElement('input');
//       formsaveelem.setAttribute('type','submit');
//       formsaveelem.setAttribute('class','image_save_button');
//       formsaveelem.setAttribute('name','save_img');
//       formsaveelem.setAttribute('value','Save');
//       formelem.appendChild(formsaveelem);

//       document.getElementById('add_photo_div').appendChild(formelem);


//       document.getElementById('login_form_div_id').style.display='none';
//       document.getElementById('logout_link').setAttribute('id','showDiv');
//       document.getElementsByClassName('login_btn')[0].setAttribute('id','hide');
//       document.getElementById('home_link').setAttribute('href','#');
//       flag=false;
//       show('userpage','login_form');
//       document.getElementById('usernamespan').innerHTML=username;
      
//       //console.log(username);
//       //console.log(data[i].galleryid);
//       //alert(data[i].galleryid.length);
//      //console.log(gallerydata);
      
//       for (var j = 0; j < data[i].galleryid.length; j++){

//         var elem = document.createElement("img");
//          elem.setAttribute('id','imgid'+data[i].galleryid[j])
//         var imgid=data[i].galleryid[j];
//         //console.log(gallerydata[imgid]);
        
//         console.log(imgid);
//         console.log(gallerydata);
//         for (var k = 0; k < gallerydata.length; k++) {
//           if(gallerydata[k].id==imgid){
//             elem.src =gallerydata[k].url;
//             break;
//           }
//         }
        
//         var imgdiv=document.createElement("div");
//         imgdiv.setAttribute('class','imggallery');

//         //document.getElementById("imagegallery").appendChild(elem);
//         imgdiv.appendChild(elem);

//         var divelem=document.createElement("p");
//         divelem.setAttribute('id','imgparaid'+data[i].galleryid[j]);
//         divelem.setAttribute("class","gallerypara");
//         divelem.innerHTML="<a href='#' id='edit"+data[i].galleryid[j]+"'>Edit</a>"+
//                           "<a href='#' id='delete"+data[i].galleryid[j]+"'>Delete</a>" +
//                           "<a href='#' id='like"+data[i].galleryid[j]+"'>Like</a>" +
//                           "<a href='https://www.facebook.com' target='_blank' id='facebook_image'>Fb</a>" +
//                           "<a href='https://www.twitter.com' target='_blank' id='twitter_image'>Tw</a>" ;
        
//         imgdiv.appendChild(divelem)
//         document.getElementById("imagegallery").appendChild(imgdiv);

//         imagegalleryarray.push(gallerydata[k]);
//         console.log(imagegalleryarray);
//         document.getElementById("edit"+data[i].galleryid[j]+"").addEventListener('click',editPhoto);
//         document.getElementById("delete"+data[i].galleryid[j]+"").addEventListener('click',deletePhoto);
//         document.getElementById("like"+data[i].galleryid[j]+"").addEventListener('click',likePhoto);

//         //document.getElementById("edit"+imagegalleryarray[j]+"").addEventListener('click',editPhoto);
//         // document.getElementById("delete"+imagegalleryarray[j]+"").addEventListener('click',deletePhoto);
//      }
//       document.getElementById('add_photo').addEventListener('click',showAddPhotoDIv);

//       formelem.onsubmit=addPhoto;
//       return false;
//     }
//   }
//   if(flag==true){
//     document.getElementById('errormsg').innerHTML="Wrong Username or Password";
//     return false;
//    }
//   }
// }


//==============================Show Add Phot Div===============================
// document.getElementById('add_photo'+i).addEventListener('click',showAddPhotoDIv);

function showAddPhotoDIv(){
  //console.log(this.id);
  document.getElementById('add_photo_div').style.display='block';
}

 //document.getElementById('image_form').onsubmit=addPhoto;


//============================Add New Photo====================================
function addPhoto(){
 // console.log(this.id.substr(10));
 
  var newphoto={};
  // if(imagegalleryarray.length==0){
  //   newphoto.id=1;
  // }
  // else{
  //   newphoto.id=imagegalleryarray[imagegalleryarray.length-1].id+1;
  // }

  if(gallerydata.length==0){
    newphoto.id=1;
  }
  else{
    //console.log(gallerydata);
    newphoto.id=gallerydata[gallerydata.length-1].id+1;
  }

  if(document.getElementById('imagefilename').value==''){
    alert('Please Select File');
  }
  else if(document.getElementById('imagefilename').value.substr(-3).toLowerCase()!='jpg' && document.getElementById('imagefilename').value.substr(-3).toLowerCase()!='png' && document.getElementById('imagefilename').value.substr(-4).toLowerCase()!='jpeg'){
     alert('Please Select Image File');
  }
  else{
    data[this.id.substr(10)].galleryid.push(newphoto.id);
    newphoto.url="./Images"+document.getElementById('imagefilename').value.substr(11);
    newphoto.description=document.getElementById('description').value;
    newphoto.likes=0;
    imagegalleryarray.push(newphoto);
    
    gallerydata.push(newphoto);
    localStorage.setItem('gallery', JSON.stringify(gallerydata));
    //gallerydata = JSON.parse(localStorage.getItem('gallery'));

    localStorage.setItem('user', JSON.stringify(data));
    data = JSON.parse(localStorage.getItem('user'));

    //console.log(imagegalleryarray);
    //check();
    document.getElementById('add_photo_div').style.display='none';

    var elem = document.createElement("img");

    elem.setAttribute('id','imgid'+newphoto.id)
    //var imgid=imagegalleryarray.length;
    //console.log(gallerydata[imgid]);
    
    elem.src =newphoto.url;
    var imgdiv=document.createElement("div");
    imgdiv.setAttribute('class','imggallery');

    //document.getElementById("imagegallery").appendChild(elem);
    imgdiv.appendChild(elem);

    var divelem=document.createElement("p");
    divelem.setAttribute('id','imgparaid'+newphoto.id);
    divelem.setAttribute("class","gallerypara");
    divelem.innerHTML="<a href='#' class='edit' id='edit"+newphoto.id+"'></a>"+
                      "<a href='#' class='delete' id='delete"+newphoto.id+"'></a>" +
                      "<a href='#' class='like' id='like"+newphoto.id+"'></a>" +
                      "<a href='https://www.facebook.com' target='_blank' class='facebook_share' id='facebook_image'></a>" +
                      "<a href=''https://www.twitter.com' target='_blank' class='twitter_share' id='twitter_image'></a>" ;
    imgdiv.appendChild(divelem)
    document.getElementById("imagegallery").appendChild(imgdiv);

     document.getElementById("edit"+newphoto.id+"").addEventListener('click',editPhoto);
     document.getElementById("delete"+newphoto.id+"").addEventListener('click',deletePhoto);
     document.getElementById("like"+newphoto.id+"").addEventListener('click',likePhoto);
  }
  
  //console.log(imagegalleryarray);
  //console.log(data);
  return false;
}

function check(){
  //console.log(imagegalleryarray);
}


//============================Edit Photo=======================================
function editPhoto() {
  //alert("Edit");
  //console.log(this.id.substr(4));
  //console.log(this.id);
  document.getElementById(this.id).style.display='none';
  var id=this.id.substr(4);
  for (var i = 0; i < imagegalleryarray.length; i++) {
    if(imagegalleryarray[i].id==id){

      var editdiv=document.createElement('div');
      editdiv.setAttribute("class","editInputDiv");

      var inputelem=document.createElement('input');
      inputelem.setAttribute("class","editInput");
      inputelem.setAttribute("id","editInputTag"+id);
      inputelem.value=imagegalleryarray[i].description;

      //document.getElementById('imgparaid'+id).appendChild(inputelem);
      editdiv.appendChild(inputelem);

      var saveelem=document.createElement('input');
      saveelem.setAttribute("type","button");
      saveelem.setAttribute("class","saveEditInputBtn");
      saveelem.setAttribute("id",'saveChanges'+id);
      saveelem.value="Save";

      //document.getElementById('imgparaid'+id).appendChild(saveelem);
      editdiv.appendChild(saveelem);
      document.getElementById('imgparaid'+id).appendChild(editdiv);

      document.getElementById('saveChanges'+id).addEventListener('click',saveEditimg);

      //alert('imgparaid'+id);
      //console.log(imagegalleryarray[i]);
      break;
    }
  }
  //console.log(imagegalleryarray);
}

//========================Edited Photo Save==========================================

function saveEditimg(){
  //document.getElementById('editInputTag'+this.id.substr(11)).style.display='none';
  //document.getElementById('saveChanges'+this.id.substr(11)).style.display='none';
  console.log(this.id);
  for (var i = 0; i < imagegalleryarray.length; i++) {
    if(imagegalleryarray[i].id==this.id.substr(11)){
        imagegalleryarray[i].description=document.getElementById('editInputTag'+this.id.substr(11)).value;
        break;
    }
  }
  for (var j = 0; j < gallerydata.length; j++) {
    if(gallerydata[j].id==this.id.substr(11)){
       gallerydata[j].description=imagegalleryarray[i].description;
       localStorage.setItem('gallery', JSON.stringify(gallerydata));
    }
  }
      console.log(gallerydata);
  document.getElementById('edit'+this.id.substr(11)).style.display='inline-block';

  var elem = document.getElementById('editInputTag'+this.id.substr(11));
  elem.parentNode.removeChild(elem);

  var elembtn = document.getElementById('saveChanges'+this.id.substr(11));
  elembtn.parentNode.removeChild(elembtn);
}

//===========================Delete Photo=====================================
function deletePhoto() {
  alert("Delete");
  //console.log(this.id.substr(6));
  var id=this.id.substr(6);
  for (var i = 0; i < imagegalleryarray.length; i++) {
    if(imagegalleryarray[i].id==id){

      var elem = document.getElementById('imgid'+imagegalleryarray[i].id);
      elem.parentNode.removeChild(elem);

      var divelem = document.getElementById('imgparaid'+imagegalleryarray[i].id);
      var imgdivelem=divelem.parentNode;
      divelem.parentNode.removeChild(divelem);

      imgdivelem.parentNode.removeChild(imgdivelem);

      //console.log(imagegalleryarray[i]);
      imagegalleryarray.splice(i,1);

      for (var k = 0; k < data.length; k++) {
        for (var j = 0; j < data[k].galleryid.length; j++) {
          if(data[k].galleryid[j]==id){
            data[k].galleryid.splice(j,1);
            break;
          }
        }
      }

      for (var m = 0; m < gallerydata.length; m++) {
        if(gallerydata[m].id==id){
          gallerydata.splice(m,1);
          break;
        }
      }

      console.log(gallerydata);
      localStorage.setItem('gallery', JSON.stringify(gallerydata));
      gallerydata = JSON.parse(localStorage.getItem('gallery'));

      localStorage.setItem('user', JSON.stringify(data));
      data = JSON.parse(localStorage.getItem('user'));
      break;
    }
  }
  //console.log(imagegalleryarray);
}


//==========================Like Photo========================================
function likePhoto() {
  //alert("Like");
  //console.log(this.id.substr(4));
  gallerydata = JSON.parse(localStorage.getItem('gallery'));
  var id=this.id.substr(4);
  for (var i = 0; i < imagegalleryarray.length; i++) {
    if(imagegalleryarray[i].id==id){
      imagegalleryarray[i].likes+=1;
      
      console.log(imagegalleryarray[i]);
      break;
    }
  }

  for (var j = 0; j < gallerydata.length; j++) {
    if(gallerydata[j].id==id){
       gallerydata[j].likes=imagegalleryarray[i].likes;
       localStorage.setItem('gallery', JSON.stringify(gallerydata));
    }
  }
}


//========================Winner Photo==========================================
document.getElementById('winner_photo').addEventListener('click',winnerPhoto);

function winnerPhoto() {

  var elem =document.getElementById('imagegallery');
  elem.style.display='none';

  var elemadd =document.getElementById('add_photo');
  elemadd.style.display='none';

  document.getElementById('btn_prev').style.display='none';
  document.getElementById('btn_next').style.display='none';

  var winelem =document.getElementById('winning_image');
  winelem.style.display='block';

  var like=0,imgid=0;
  // for (var i = 0; i < imagegalleryarray.length; i++) {
  //   if(imagegalleryarray[i].likes>=like){
  //     like=imagegalleryarray[i].likes;
  //     imgid=i;
  //   }
  // }

  for (var i = 0; i < gallerydata.length; i++) {
    if(gallerydata[i].likes>like){
      like=gallerydata[i].likes;
      imgid=i;
    }
  }

  document.getElementById("winning_image").innerHTML="";

  var heading = document.createElement("h1");
  heading.innerHTML="Winning Image";
  document.getElementById('winning_image').appendChild(heading);

  if(gallerydata.length!=0){
    var elem = document.createElement("img");

  // if(gallerydata.length!=0){
  //   var elem = document.createElement("img");

  //elem.setAttribute('id','imgid'+newphoto.id)
  //var imgid=imagegalleryarray.length;
  //console.log(gallerydata[imgid]);
  
   //elem.src =imagegalleryarray[imgid].url;

   elem.src =gallerydata[imgid].url;

  //elem.src =gallerydata[imgid].url;
  //alert(imagegalleryarray[imgid].url);

  document.getElementById("winning_image").appendChild(elem);

  var discriptelem=document.createElement("p");
  //discriptelem.innerHTML+="Description :"+imagegalleryarray[imgid].description;
  discriptelem.innerHTML+="Description :"+gallerydata[imgid].description;
  document.getElementById("winning_image").appendChild(discriptelem);

  var divelem=document.createElement("p");
  divelem.innerHTML+="Likes :"+like;
  document.getElementById("winning_image").appendChild(divelem);

  }

  //alert(imgid);
  //alert(like);
}

//====================Home page=================================================
document.getElementById('home_link').addEventListener('click',homePage);

function homePage() {

  var elem =document.getElementById('winning_image');
  elem.innerHTML="";
  elem.style.display='none';

  var winelem =document.getElementById('imagegallery');
  winelem.style.display='block';

  var elemadd =document.getElementById('add_photo');
  elemadd.style.display='block';

  document.getElementById('btn_prev').style.display='inline';
  document.getElementById('btn_next').style.display='inline';

  document.getElementById('winner_photo').style.display='block';
}

//==========================Pagination==============================================
    document.getElementById("btn_next").setAttribute('href','javascript:nextPage();');
    document.getElementById("btn_prev").setAttribute('href','javascript:prevPage();');

    var current_page = 1;
    var records_per_page = 2;
    var datai=0;

    function prevPage() {
        if (current_page > 1) {
            current_page--;
            changePage(current_page,datai);
        }
    }

    function nextPage() {
        if (current_page < numPages(datai)) {
            current_page++;
            changePage(current_page,datai);
        }
    }

    function changePage(page,i)
    {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var listing_table = document.getElementById("imagegallery");
        //var page_span = document.getElementById("page");

        // Validate page
        if (page < 1) page = 1;
        if (page > numPages(i)) page = numPages(i);

        listing_table.innerHTML = "";

        for (var j = (page-1) * records_per_page; j < (page * records_per_page) && j<data[datai].galleryid.length ; j++){

          var elem = document.createElement("img");
           elem.setAttribute('id','imgid'+data[i].galleryid[j])
          var imgid=data[i].galleryid[j];
          //console.log(gallerydata[imgid]);
          
          console.log(imgid);
          console.log(gallerydata);
          for (var k = 0; k < gallerydata.length; k++) {
            if(gallerydata[k].id==imgid){
              elem.src =gallerydata[k].url;
              break;
            }
          }
          
          var imgdiv=document.createElement("div");
          imgdiv.setAttribute('class','imggallery');

          //document.getElementById("imagegallery").appendChild(elem);
          imgdiv.appendChild(elem);

          var divelem=document.createElement("p");
          divelem.setAttribute('id','imgparaid'+data[i].galleryid[j]);
          divelem.setAttribute("class","gallerypara");
          divelem.innerHTML="<a href='#' class='edit' id='edit"+data[i].galleryid[j]+"'></a>"+
                            "<a href='#' class='delete' id='delete"+data[i].galleryid[j]+"'></a>" +
                            "<a href='#' class='like' id='like"+data[i].galleryid[j]+"'></a>" +
                            "<a href='https://www.facebook.com/share?url=' target='_blank' class='facebook_share' id='facebook_image'></a>" +
                            "<a href='https://www.twitter.com' target='_blank' class='twitter_share' id='twitter_image'></a>" ;
          
          imgdiv.appendChild(divelem)
          //listing_table.innerHTML+=imgdiv;
          document.getElementById("imagegallery").appendChild(imgdiv);

          imagegalleryarray.push(gallerydata[k]);
          console.log(imagegalleryarray);
          document.getElementById("edit"+data[i].galleryid[j]+"").addEventListener('click',editPhoto);
          document.getElementById("delete"+data[i].galleryid[j]+"").addEventListener('click',deletePhoto);
          document.getElementById("like"+data[i].galleryid[j]+"").addEventListener('click',likePhoto);

          //document.getElementById("edit"+imagegalleryarray[j]+"").addEventListener('click',editPhoto);
          // document.getElementById("delete"+imagegalleryarray[j]+"").addEventListener('click',deletePhoto);
       }
        // for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        //     listing_table.innerHTML += objJson[i].adName + "<br>";
        // }
        //page_span.innerHTML = page;

        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == numPages(i)) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }

function numPages(i) {
      return Math.ceil(data[i].galleryid.length / records_per_page);
  }


//==============Check User Credentials and Display User page==========================
function check_login(){
  data = JSON.parse(localStorage.getItem('user'));
  //console.log(data);
  var username=document.getElementById('username').value;
  var password=document.getElementById('password').value;
  var flag=true;

  if(username=='' || password==''){
    document.getElementById('errormsg').innerHTML='';
    if(username==''){
      document.getElementById('errormsg').innerHTML+="Username ";
    }
    if(password==''){
      document.getElementById('errormsg').innerHTML+="Password ";
    }
    document.getElementById('errormsg').innerHTML+="Should not be Empty";
    return false;
  }
  else {
    for (var i = 0; i < data.length; i++) {
    if(data[i].username==username && data[i].password==password){
      var addbtnelem=document.createElement('button');
      addbtnelem.setAttribute('class','btn_add_new_photo');
      addbtnelem.setAttribute('id','add_photo');
      addbtnelem.style.display='block';
      addbtnelem.innerHTML="Add New Photo";
      document.getElementById("userspan").appendChild(addbtnelem);


      var formelem=document.createElement('form');
      formelem.setAttribute('id','image_form'+i);
    
      var formfileelem=document.createElement('input');
      formfileelem.setAttribute('type','file');
      formfileelem.setAttribute('name','filename');
      formfileelem.setAttribute('id','imagefilename');
      formelem.appendChild(formfileelem);

       var formtextelem=document.createElement('textarea');
      formtextelem.setAttribute('placeholder','description');
      formtextelem.setAttribute('name','description');
      formtextelem.setAttribute('id','description');
      formelem.appendChild(formtextelem);

      var formsaveelem=document.createElement('input');
      formsaveelem.setAttribute('type','submit');
      formsaveelem.setAttribute('class','image_save_button');
      formsaveelem.setAttribute('name','save_img');
      formsaveelem.setAttribute('value','Save');
      formelem.appendChild(formsaveelem);

      document.getElementById('add_photo_div').appendChild(formelem);


      document.getElementById('login_form_div_id').style.display='none';
      document.getElementById('logout_link').setAttribute('id','showDiv');
      document.getElementsByClassName('login_btn')[0].setAttribute('id','hide');
      document.getElementById('home_link').setAttribute('href','#');
      flag=false;
      show('userpage','login_form');
      document.getElementById('usernamespan').innerHTML=username;
      
      //console.log(username);
      //console.log(data[i].galleryid);
      //alert(data[i].galleryid.length);
     //console.log(gallerydata);

     datai=i;

     if(data[datai].galleryid.length==0){
      btn_prev.style.visibility = "hidden";
      btn_next.style.visibility = "hidden";
     }

     if(data[datai].galleryid.length!=0){
        changePage(1,datai);
     }
    
      document.getElementById('add_photo').addEventListener('click',showAddPhotoDIv);

      formelem.onsubmit=addPhoto;
      return false;
    }
  }
  if(flag==true){
    document.getElementById('errormsg').innerHTML="Wrong Username or Password";
    return false;
   }
  }
}