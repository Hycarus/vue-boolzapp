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
                    this.scroll() 
        }, 100)
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
        setTimeout(() => {
            this.scroll() 
        }, 100)
    },
    scroll(){
        const element = document.querySelector('.chat');
        element.scroll({top: element.scrollHeight, behavior: 'smooth'});
    }

},
computed: {
    activeIndex(){
        return getIndex(this.activeContact, this.contacts)
    }
}
}).mount('#app')