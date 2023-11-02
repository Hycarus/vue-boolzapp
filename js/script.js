import {contacts} from './data.js'
import {getIndex} from './utility.js'
import {messages} from './data.js'
import { getRndInteger } from './utility.js'
const {createApp} = Vue
createApp({
// contiene tutti i dati / le variabili 
data(){
    return {
        contacts: contacts,
        activeContact: 1,
        activeMessage: '',
        messages: messages,
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
        setTimeout(() => {
            this.sendAnswers() 
            
        }, 1000)
    }, 
    sendAnswers(){
        this.contacts[this.activeIndex].messages.push({
            date: new Date().toLocaleString(),
            message: this.messages[getRndInteger(0, this.messages.length - 1)],
            status:'received'
        })
    }
},
computed: {
    activeIndex(){
        return getIndex(this.activeContact, this.contacts)
    }
}
}).mount('#app')