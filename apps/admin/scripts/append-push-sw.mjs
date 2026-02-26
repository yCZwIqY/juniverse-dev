import fs from 'node:fs';
import path from 'node:path';

const swPath = path.join(process.cwd(), 'public', 'sw.js');
const marker = '/* PUSH_EVENT_PATCH */';

if (!fs.existsSync(swPath)) {
  process.exit(0);
}

const source = fs.readFileSync(swPath, 'utf-8');
if (source.includes(marker)) {
  process.exit(0);
}

const patch = `
${marker}
self.addEventListener('push',function(event){
  if(!event.data)return;
  var payload={};
  try{payload=event.data.json();}catch(_){payload={};}
  var title=payload.title||'새 알림';
  var options={
    body:payload.body||'',
    icon:'/images/logo.png',
    badge:'/images/logo.png',
    data:{url:payload.url||'/'}
  };
  event.waitUntil(self.registration.showNotification(title,options));
});
self.addEventListener('notificationclick',function(event){
  event.notification.close();
  var url=(event.notification&&event.notification.data&&event.notification.data.url)||'/';
  event.waitUntil(
    self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(clientsArr){
      for(var i=0;i<clientsArr.length;i++){
        var client=clientsArr[i];
        if(client&&'focus' in client){
          client.navigate(url);
          return client.focus();
        }
      }
      if(self.clients.openWindow){
        return self.clients.openWindow(url);
      }
      return undefined;
    })
  );
});
`;

fs.writeFileSync(swPath, `${source}\n${patch}`);
console.log('Patched service worker with push handlers.');

