const Http = new XMLHttpRequest();
const url='https://api.particle.io/v1/devices/50ff6f065067545626430587/temp?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}
