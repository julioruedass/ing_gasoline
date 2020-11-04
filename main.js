
////Codigo de envio de formulario signup-form con firestore
 const signup_form = document.querySelector('#signup-form'); 

 signup_form.addEventListener('submit',(e)=>{
    e.preventDefault();
 
    const user_name = document.querySelector('#signup-correo').value;
    const user_password = document.querySelector('#signup-password').value;

    console.log(user_name, '  ', user_password ); 

    auth.createUserWithEmailAndPassword(user_name,user_password)
    .then(userCredential => {
       //limpiar el formulario 
        signup_form.reset(); 
        //ocultar formulario
        $('#signupModal').modal('hide')  
       
        //crear usuario en base de Datos
         fs.collection('users').doc().set({
            user_name,
            user_password
        })

 //Mensaje de Con exito de registro de usuario
        console.log('Add User Bd and AUTH')

    }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
       console.log('1 Error Code=', errorCode, ' \n Error describ ', errorMessage);
    })
   
}) 



//Codigo con wst Flota
var checkbox = document.querySelector("input[name=flota]");
checkbox.addEventListener( 'change', function() {
    const flotavar = document.querySelector('.flotaid');
    if(this.checked) {
        
let inp=`<input type="text" id="signup-flota" class="form-control" 
placeholder="Id Flota"  style="font-family: Consolas, monospace">`;
flotavar.innerHTML =inp;
        console.log("Flota True");
    } else {
       // let descrip = document.getElementById('descripcion6').setAttribute('type', 'text');
       flotavar.innerHTML='<a style="font-family: Consolas, monospace">El Codigo de Flota es Obligatorio</ha>';
        console.log("Flota False");
    }
  
});



////Codigo de envio de formulario signin-form con firestore

const signin_form = document.querySelector('#signin-form');
signin_form.addEventListener('submit', e =>{
e.preventDefault();
const correo = document.querySelector('#signin-correo').value;
const password = document.querySelector('#signin-password').value;
 console.log(correo, '  ', password ); 
 auth.signInWithEmailAndPassword(correo, password)
 .then(userCredential => {
    //limpiar el formulario 
     signin_form.reset(); 
     //ocultar formulario
     $('#signinModal').modal('hide')  
     //Mensaje de Con exito de registro de usuario
     console.log('Correct User')
 }).catch(function(error) {
     let errorCode = error.code;
     let errorMessage = error.message;
    console.log('1 Error Code=', errorCode, ' \n Error describ ', errorMessage);
 })

})  

/// Cerrar cesion sinout con firestore
const logout= document.querySelector('#logout');
logout.addEventListener("click",e =>
{e.preventDefault();
    auth.signOut().then(()=>{
 console.log("Finish user");
    }); 
});


//Post
const postList = document.querySelector('.userli');
const setupPost =data => {
    if(data.length){
let html =``;
//efecto hover list group item action
data.forEach(doc  => {
    const post =doc.data()
    console.log(post)
    const li =`
      <tr>
      <td><i class=" text-warning fas fa-database"></i> ${post.user_name}</td>
      <td>${post.user_password}</td>
      <td>${post.user_target}</td>
      </tr>
    `;
    html += li;
});
postList.innerHTML =html;
    } else {  postList.innerHTML = '<p class="text-warning" >Seccion Finalizada</p>'; }
};


//Events usuario authenticaddos
//List for auth state shanges
auth.onAuthStateChanged((user) => {
    if(user){ 
        console.log('Auth: ON')
        fs.collection('users')
        .get()
        .then((snapshot) => {
            //muestra los objetos de la colection
            setupPost(snapshot.docs) });
    }else {
        console.log('Auth: OFF')
       setupPost([]);
    }
});

