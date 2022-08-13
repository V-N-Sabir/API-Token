import child_process from 'child_process'

import readline from 'readline'

// Работает

  const val =  child_process.exec("start cmd.exe /K cd..", 
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  




const rl = readline.createInterface({
  input: process.stdin,
 //input: val,
  output: process.stdout
})

rl.question('Enter yor name ', name => {
  console.log(`Hello ${name}`)
  rl.close()
})


//const log = fs.openSync('./log.out', 'w');

//const c = cp.spawn(
//  'npm.cmd', 
//  ['-g', 'ls', '--depth', '0'],
//  {stdio: ['ignore', log, log], detached: true, shell: false, windowsHide: true}
//);
//const valf = child_process.execFile('cmd.exe')



//child_process.spawn(command[, args][, options])

//const spaun = child_process.spawn('cmd.exe', ['/c', 'my.bat'])

//const spaun = child_process.spawn('cmd.exe', ['cd..'])

//spaun.stdout.on('data', (data) => {
//  console.log(data.toString('utf-8'))
//});