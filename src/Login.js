
export default function Login() {
  const container = document.createElement('div');
  container.className = 'login-container';

  const logo = document.createElement('img');
  logo.src = '/public/logo.jpeg';
  logo.alt = 'Company Logo';
  logo.className = 'logo';
  document.body.appendChild(logo);

  const heading = document.createElement('h1');
  heading.innerText = 'Cloud360Gov';
  container.appendChild(heading);

  const username = document.createElement('input');
  username.type = 'text';
  username.placeholder = 'Username';
  container.appendChild(username);

  const password = document.createElement('input');
  password.type = 'password';
  password.placeholder = 'Password';
  container.appendChild(password);

  const button = document.createElement('button');
  button.innerText = 'Sign In';
  container.appendChild(button);

  const linksDiv = document.createElement('div');
  linksDiv.className = 'links';
  linksDiv.innerHTML = '<a href="#">Forgot password?</a><a href="#">Create account</a>';
  container.appendChild(linksDiv);

  return container;
}
