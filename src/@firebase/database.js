import firebase from './__init';
import 'firebase/database';
export default firebase.database(firebase.app('database'));