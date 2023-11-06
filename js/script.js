const dt = luxon.DateTime;
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
        activeContact: null,
        activeMessage: '',
        messages: messages,
        findContact: '',
        clicked: null,
        theme: true,
        backgroundImage: 'img/mine.jpeg',
        backgroundImageStyle: 'url(../img/mine.jpeg)',
        onlineStatus: false,
        isWriting: false,
        dropDownFlag: false,
    }
},
// contiene le funzioni e i metodi
methods: {
    isActive(id){
        return id === this.activeContact ? true : false;
    },
    sendMessage(){
        if(this.activeMessage.trim()!== ''){
            this.contacts[this.activeIndex].messages.push({
                date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                message: this.activeMessage,
                status:'sent'
            })
            this.activeMessage = ''
            setTimeout(() => {
                    this.scroll() 
            }, 100)
            setTimeout(() => {
                this.isWriting = true; 
            }, 2000)
            setTimeout(() => {
                this.sendAnswers() 
                this.isWriting = false;
                this.onlineStatus = true;
            }, 5000);
            setTimeout(() => {
                this.onlineStatus = false;
            }, 7000);
        }
        
    }, 
    sendAnswers(){
        this.contacts[this.activeIndex].messages.push({
            date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
            message: this.messages[getRndInteger(0, this.messages.length - 1)],
            status:'received'
        })
        setTimeout(() => {
            this.scroll() 
        }, 100)
    },
    scroll(){
        const element = this.$refs.chat;
        element.scroll({top: element.scrollHeight, behavior: 'smooth'});
    },
    getLastMessage(id){
        const contact = this.contacts.find(contact => contact.id === id);
        const len = contact.messages.length;
        if(len > 0){
            return contact.messages[len - 1].message;
        } else{
            return 'Non hai messaggi con questo contatto';
        }
    },
    getLastAccess(id){
        const contact = this.contacts.find(contact => contact.id === id);
        const len = contact.messages.length;
        if(len > 0){
            return contact.messages[len - 1].date;
        } else{
            return '';
        }
    },
    formatHour(date){
        return date.slice(11, 16);
    },
    filterContact(){
        return this.contacts.filter((contact) => 
            contact.name.toLowerCase().includes(this.findContact.toLowerCase())
        );
    },
    dropDownRemove(index){
        if(this.clicked!== null){
            this.clicked = null;
        }else{
            this.clicked = index;
        }
        this.switchToChat
    },
    deleteMessage(index){
        this.contacts[this.activeIndex].messages.splice(index, 1);
        this.clicked = null;
    },
    deleteAllMessage(){
        this.contacts[this.activeIndex].messages = [];
    },
    deleteContact(){
        this.contacts.splice(this.activeIndex, 1);
        this.activeContact = null;
    },
    switchToContact(){
        const mq = window.matchMedia("(max-width: 768px)");
        if(mq.matches){
            const returnContact = this.$refs.return;
            const rightSection = this.$refs.right;
            const leftSection = this.$refs.left;
            returnContact.classList.add('d-none');
            rightSection.classList.add('d-none');
            leftSection.classList.remove('d-none');
            }
    },
    switchToChat(){
        const mq = window.matchMedia("(max-width: 768px)");
        if(mq.matches){
            const rightSection = this.$refs.right;
            const leftSection = this.$refs.left;
            const returnContact = this.$refs.return;
            rightSection.classList.remove('d-none');
            leftSection.classList.add('d-none');
            returnContact.classList.remove('d-none');
            }
        
    },
    switchToDarkMode(){
        const sun = this.$refs.sun;
        const moon = this.$refs.moon;
        const darkMode = this.$refs.app;
        if(this.theme === false){
            sun.classList.remove('d-none');
            moon.classList.add('d-none');
            darkMode.setAttribute('data-bs-theme', 'light');
            this.backgroundImage = 'img/mine.jpeg';
            this.theme = true;
        } else if(this.theme === true){
            sun.classList.add('d-none');
            moon.classList.remove('d-none');
            darkMode.setAttribute('data-bs-theme', 'dark');
            this.backgroundImage = 'img/mine-dark.jpeg';
            this.theme = false;
        }
    }
},
computed: {
    activeIndex(){
        return getIndex(this.activeContact, this.contacts)
    },
    lastDate(){
        const len = this.contacts[this.activeIndex].messages.length;
        if(len > 0){
            return this.contacts[this.activeIndex].messages[len - 1].date;
        } else{
            return '';
        }
    },
},
mounted() {
    const splash = this.$refs.splash;
    const app = this.$refs.app;
    setTimeout(() => {
        splash.classList.add('d-none');
        app.classList.remove('d-none');
    }, 1000);
},
}).mount('#app')