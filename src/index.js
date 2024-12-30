import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { exec } from 'child_process';

const app = new Hono()

app.get('/api/list', (c) => {
  const promise = new Promise((resolve, reject) => {
      exec('pnpm ls --json', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(`Error listing packages: ${error.message}`); 
        } else if (stderr) {
           console.error(`stderr: ${stderr}`)
           reject(stderr)
        } else {
          try {
            const packages = JSON.parse(stdout)[0].dependencies
            console.log(packages);
            resolve(packages || [])
          }
          catch(parseError){
              console.error(`JSON parse error: ${parseError}`)
              reject(`Error parsing: ${parseError.message}`)
          }
        }
      });
    });
    return promise.then(r => c.json(r)).catch(e => c.text(e, 500))
})

app.get('/api/audit', (c) => {
  const promise = new Promise((resolve, reject) => {
      exec('pnpm audit --json', (error, stdout, stderr) => {
          if(error) {
              reject(`Error auditing packages: ${error.message}`)
          }
          else{
              try{
                  const result = JSON.parse(stdout)
                  resolve(result)
              }
              catch(parseError){
                  reject(`Error parsing: ${parseError.message}`)
              }
          }
      })
  })
  return promise.then(r => c.json(r)).catch(err => c.text(err, 500))
})

app.get('/api/why/:packageName', (c) => {
const packageName = c.req.param('packageName');
const promise = new Promise((resolve, reject) => {
    exec(`pnpm why ${packageName}`, (error, stdout, stderr) => {
        if(error){
            reject(`Error getting why information: ${error.message}`)
        }
        else{
            resolve(stdout)
        }
    })
})
return promise.then(r => c.text(r)).catch(e => c.text(e, 500))
});


app.post('/api/uninstall', async (c) => {
  const { packageName } = await c.req.json();
  const promise = new Promise((resolve, reject) => {
      exec(`pnpm uninstall ${packageName}`, (error, stdout, stderr) => {
          if(error){
              reject(`Error uninstalling package ${error.message}`)
          }
          else {
              resolve(`Package ${packageName} uninstalled successfully.`)
          }
      });
  })
  return promise.then(r => c.text(r)).catch(e => c.text(e, 500))
});

app.use('/*', serveStatic({ root: './static' }));

const port = 3000;
console.log(`Server is running on: http://127.0.0.1:${port}`)
serve(app);