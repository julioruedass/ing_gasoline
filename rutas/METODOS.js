

//recorrer los datos


//obtener base de datos
const userli = document.querySelector('.user_li');
const setupUser =data => {
if(data.length){
    let html=``;
    data.forEach(doc => {
        const post =doc.data()
        console.log(user)
        const li= `<li class="list-group-item"> 
        <h5>${doc.user_id}</h5>
        <h5>${doc.user_arduino}</h5>    
        <p>${doc.user_correo}</p>
        </li>`
        ;
        html +=li; 
    });      
    userli.innerHTML = html;
}else{
     userli.innerHTML = `<p class="text-center">No se encuentran Informacion</p>` ;
}
}

//Eventos
auth.onAuthStateChanged(user => {
    if(user){
        console.log('Si hay autenticacion')
        fires.collection('user')
        .get()
        .then((snapshop) => {
            console.log(snapshop.docs)
            //setupUser(snapshop.docs)
        })
    }else{
        console.log('No hay autenticacion')
    }
}) 






//Post
const postList = document.querySelector('.user_li');
const setupPost =data => {
    if(data.length){
let html ='';
data.forEach(doc  => {
    const post =doc.data()
    console.log(post)
    const li =`
    <li class="list-group-item list-group-item-action">
    <h5>${doc.id}</h5>
    <p>${doc.correo}</p>
    </li>
    `;
    html += li;
});
postList.innerHTML =html
    } else {
        postList.innerHTML = '<p class="text-center">login Error</p>';
    }
}

//Events
//List for auth state shanges
auth.onAuthStateChanged(user => {
    if(user){ 
        console.log('auth: ON')
        fs.collection('base')
        .get()
        .then((snapshot) => {
            setupPosts(snapshot.docs)        })
    }else {
        console.log('auth: OFF')
        setupPost([])
    }
})