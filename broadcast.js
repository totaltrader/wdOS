$(document).ready(function() {
  var http = require('http');
  var url = require('url');
  var fs = require('fs');
  var os = require('os');
  var ifaces = os.networkInterfaces();
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_dir = wd_homedir + '/Documents' + '/wdOS/WWW/';
  var wd_cast = wd_homedir + '/Documents' + '/wdOS/Cast/';
  var wd_app = wd_homedir + '/Documents' + '/wdOS/App/';
  var wd_home = wd_homedir + '/Documents/wdOS/';
  var file = fs.readFileSync(wd_home + 'Core/broad.json');
  var broad = JSON.parse(file);
  $("#serv option[value=" + broad.serv + "]").prop('selected', true);
  $("#port").val(broad.port);
  $("#submit").click(function(){
    var con = '{"serv": "';
    con += $("#serv").val();
    con += '", "port": ';
    con += Math.max($("#port").val(), 80);
    con += '}';
    //con = JSON.stringify(con);
	   fs.writeFileSync(wd_home + 'Core/broad.json', con);
	    alert("Status: Saved \n Note: Restart WebDektop to see your changes.");
  });
  Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
  if ('IPv4' !== iface.family || iface.internal !== false) {
  // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
  return;
  }
  var myIP = "";
  var cmyIP = "";
  var amyIP = "";
  if (alias >= 1) {
  // this single interface has multiple ipv4 addresses
  myIP += '<p><b>WWW: </b><u><i><a href="http://' + iface.address + ':' + broad.port + '">' + iface.address + ':' + broad.port + '</a></i></u></p>';
  cmyIP += '<p><b>Cast: </b><u><i><a href="http://' + iface.address + ':4001">' + iface.address + ':4001</a></i></u></p>';
  amyIP += '<p><b>Apps: </b><u><i><a href="http://' + iface.address + ':4000">' + iface.address + ':4000</a></i></u></p>';
  } else {
  // this interface has only one ipv4 adress
  myIP += '<p><b>WWW: </b><u><i><a href="http://' + iface.address + ':' + broad.port + '">' + iface.address + ':' + broad.port + '</a></i></u></p>';
  cmyIP += '<p><b>Cast: </b><u><i><a href="http://' + iface.address + ':4001">' + iface.address + ':4001</a></i></u></p>';
  amyIP += '<p><b>Apps: </b><u><i><a href="http://' + iface.address + ':4000">' + iface.address + ':4000</a></i></u></p>';
  }
  ++alias;
  document.getElementById("myip").innerHTML = myIP;
  document.getElementById("cmyip").innerHTML = cmyIP;
  document.getElementById("amyip").innerHTML = amyIP;
  });
  //document.getElementById("myip").innerHTML = myIP;
  });
  $("#wd_dir").click(function(){
    shell.openItem(wd_dir);
  });
  $("#wd_cast").click(function(){
    shell.openItem(wd_cast);
  });
  $("#wd_app").click(function(){
    shell.openItem(wd_app);
  });
  $(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});
});
