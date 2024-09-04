// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDWbQFB92bpjxWyiYxGARvZKYHBvwt9w0s",
    authDomain: "rifaonline-44435.firebaseapp.com",
    databaseURL: "https://rifaonline-44435-default-rtdb.firebaseio.com",
    projectId: "rifaonline-44435",
    storageBucket: "rifaonline-44435.appspot.com",
    messagingSenderId: "236843571048",
    appId: "1:236843571048:web:1f47aed76b90dd2428a8dd",
    measurementId: "G-2GTFCXF104"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao serviço de autenticação
const auth = firebase.auth();

var createUser = false;
var opcLogin = false;

function criar(){
    if(createUser == false){
        createUser = true;
        document.querySelector(".criar").style.display = 'block';
    }else{
        register();
    }
}

function logar(){
    if(createUser == true){
        document.querySelector(".criar").style.display = 'none';
    }else{
        login();
    }
}

function opcaoLogin() {
    console.log(opcLogin);
    if (opcLogin === false) {
        document.querySelector(".aaaa").style.display = 'block';
        console.log('mostrar');
        opcLogin = true;
    } else {
        document.querySelector(".aaaa").style.display = 'none';
        console.log('esconder');
        opcLogin = false;
    }
}

function verificarLogado(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Usuário está logado
            console.log("Usuário logado:", user);
            document.querySelector('.section-body').style.display = 'flex';
            document.querySelector('.section-login').style.display = 'none';
        } else {
            // Usuário não está logado
            console.log("Nenhum usuário logado.");
            document.querySelector('.section-body').style.display = 'none';
            document.querySelector('.section-login').style.display = 'flex';
        }
    });
}
verificarLogado();
// Função para alternar entre formulários de login e registro
function toggleForms() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
}

// Função de registro de novo usuário
function register() {
    const nome = document.getElementById('typeNomeX').value;
    const telefone = document.getElementById('typeTelefoneX').value;
    const email = document.getElementById('typeEmailX').value;
    const password = document.getElementById('typePasswordX').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Usuário registrado com sucesso!");
            
            // Salvar dados adicionais no Realtime Database
            const userId = user.uid;
            const cotas = ['#0022','#0001','#00541']; // Exemplo de cotas

            firebase.database().ref('users/' + userId).set({
                nome: nome,
                telefone: telefone,
                email: email,
                cotas: cotas,
                notificacoes: 'Sem notificações no momento.'
            });
            document.querySelector('.section-body').style.display = 'flex';
            document.querySelector('.section-login').style.display = 'none';
        })
        .catch((error) => {
            alert(`Erro: ${error.message}`);
        });
}


// Função de login
function login() {
    const email = document.getElementById('typeEmailX').value;
    const password = document.getElementById('typePasswordX').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redirecionar ou realizar ações após o login
            document.querySelector('.section-body').style.display = 'flex';
            document.querySelector('.section-login').style.display = 'none';
        })
        .catch((error) => {
            alert(`Erro: ${error.message}`);
        });
}

function logout() {
    auth.signOut()
        .then(() => {
            // Logout bem-sucedido
            // Redirecionar ou atualizar a interface do usuário
            document.querySelector(".aaaa").style.display = 'none';
            document.querySelector('.section-body').style.display = 'none';
            document.querySelector('.section-login').style.display = 'flex';
        })
        .catch((error) => {
            // Tratar erros durante o logout
            alert(`Erro ao realizar logout: ${error.message}`);
        });
}