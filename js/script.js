import {contacts} from './data.js'
import {getIndex} from './utility.js'
const {createApp} = Vue
createApp({
// contiene tutti i dati / le variabili 
data(){
    return {
        contacts: contacts,
        activeContact: 1,
    }
},
// contiene le funzioni e i metodi
methods: {
},
computed: {
    activeIndex(){
        return getIndex(this.activeContact, this.contacts)
    }
}
}).mount('#app')