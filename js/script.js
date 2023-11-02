import {contacts} from './data.js'
const {createApp} = Vue
createApp({
// contiene tutti i dati / le variabili 
data(){
    return {
        contacts: contacts,
    }
},
// contiene le funzioni e i metodi
methods: {
}
}).mount('#app')