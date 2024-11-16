let clients = [];
let loggedInClient = null;

// Función para registrar un cliente
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('full-name').value;
  const curp = document.getElementById('curp').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password === confirmPassword) {
    const newClient = {
      name,
      curp,
      phone,
      email,
      password,
      balance: 0.00,
      isActive: false,
    };

    clients.push(newClient);
    alert('Cuenta creada con éxito');
    document.getElementById('register-form').reset();
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
  } else {
    alert('Las contraseñas no coinciden');
  }
});

// Función para iniciar sesión
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  loggedInClient = clients.find(client => client.email === email && client.password === password);

  if (loggedInClient) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('user-name').textContent = loggedInClient.name.split(' ')[0]; // Mostrar solo el primer nombre

    // Generar los últimos 4 dígitos aleatorios de la tarjeta
    const last4Digits = Math.floor(Math.random() * 9000 + 1000);
    document.getElementById('card-number').textContent = last4Digits;

    // Mostrar saldo
    document.getElementById('balance').textContent = loggedInClient.balance.toFixed(2);
  } else {
    alert('Correo o contraseña incorrectos');
  }
});

// Función para cerrar sesión
document.getElementById('logout-btn').addEventListener('click', function() {
  loggedInClient = null;
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
});

// Panel Administrativo
document.getElementById('go-to-admin').addEventListener('click', function() {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'block';
  updateClientSelect();
});

// Asignar saldo al cliente
document.getElementById('assign-balance-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const clientEmail = document.getElementById('client-select').value;
  const newBalance = parseFloat(document.getElementById('new-balance').value);

  const client = clients.find(client => client.email === clientEmail);
  client.balance = newBalance;

  alert('Saldo asignado correctamente');
  document.getElementById('admin-success-message').style.display = 'block';
  document.getElementById('new-balance').value = '';
  updateBalanceDisplay();
});

// Regresar al Dashboard desde el Panel Administrativo
document.getElementById('back-to-dashboard').addEventListener('click', function() {
  document.getElementById('admin-panel').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
});

// Función para actualizar el select de clientes en el Panel Administrativo
function updateClientSelect() {
  const clientSelect = document.getElementById('client-select');
  clientSelect.innerHTML = '';
  
  clients.forEach(client => {
    const option = document.createElement('option');
    option.value = client.email;
    option.textContent = client.name;
    clientSelect.appendChild(option);
  });
}

function updateBalanceDisplay() {
  if (loggedInClient) {
    document.getElementById('balance').textContent = loggedInClient.balance.toFixed(2);
  }
}
