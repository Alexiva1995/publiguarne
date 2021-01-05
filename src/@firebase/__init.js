import firebase from 'firebase/app';
import certs from './@certs';
for(let name in certs){
    if(name==='default') firebase.initializeApp(certs[name]);
    else firebase.initializeApp(certs[name], name);
}
export default firebase;