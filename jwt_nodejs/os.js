import os from 'node:os'

//const dns = require('node:dns');
import dns from 'node:dns'
//import constantg from 'os.constants.signals'

//const sigl = os.constants.signals.SIGINT

//const sighub = os.constants.signals.SIGHUP
//console.log(`${sighub}`) 
//const test = signal => {
//if(signal === sigl) {
//    console.log(`Signal: ${sigl}`) 
//}
//}



//console.log(`Signal: ${sigl}`)
//const value = os.cpus()
//const value = os.hostname() // Имя компьютера
//const value = os.networkInterfaces() // Ip mac i t.d.
//const value = os.platform() //win32


//const value = os.tmpdir() //Возвращает каталог операционной системы по умолчанию для временных файлов в виде строки


//const value = os.type() //Возвращает имя операционной системы, возвращенное uname(3). Например, он возвращается 'Linux'в Linux, 'Darwin'в macOS и 'Windows_NT'в Windows.

//const value = os.userInfo()
//Возвращает информацию о текущем действующем пользователе. На платформах POSIX это обычно часть файла паролей. Возвращаемый объект включает в себя username, uid, gid, shellи homedir. В Windows поля uidи имеют значение , а есть .gid-1shellnull


//console.log(value)


//DNS


// Возвращает IP сайт
//dns.lookup('mail.ru', (err, address, family) => {
//  console.log('address: %j family: IPv%s', address, family);
//});
//// address: "93.184.216.34" family: IPv4



//const serv =  dns.getServers()
//console.log(serv)

//dns.resolve(hostname[, rrtype], callback)
//dns.resolve('','ANY', family => {
//console.log(family)    
//}
//) 


const siteURL = 'http://localhost:3000/users?mail=t_ik-t_ok@mail.ru&password=1234'

const url = new URL(siteURL)

console.log(url)