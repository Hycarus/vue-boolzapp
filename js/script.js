import {contacts} from './data.js'
import {getIndex} from './utility.js'
const {createApp} = Vue
createApp({
// contiene tutti i dati / le variabili 
data(){
    return {
        contacts: contacts,
        activeContact: 1,
        activeMessage: '',
    }
},
// contiene le funzioni e i metodi
methods: {
    isActive(id){
        return id === this.activeContact ? true : false;
    },
    sendMessage(){
        this.contacts[this.activeIndex].messages.push({
            date: new Date().toLocaleString(),
            message: this.activeMessage,
            status:'sent'
        })
        this.activeMessage = ''

    }
},
computed: {
    activeIndex(){
        return getIndex(this.activeContact, this.contacts)
    }
}
}).mount('#app')