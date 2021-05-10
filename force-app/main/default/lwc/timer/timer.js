import { LightningElement, track } from 'lwc';

export default class Timer extends LightningElement {
    @track date;
    @track time;
    @track now;
    @track timeLeft;
    @track clearInterval;

    handleClick() {
            
            const inputEvents = this.template.querySelectorAll('input');
            inputEvents.forEach(element => {
                if(element.name === 'date'){
                    this.date = element.value;
                } else if(element.name === 'time') {
                    this.time = element.value;
                }
            });
            clearInterval(this.clearInterval);
            this.handleDateTime(this.date, this.time);
    }

    handleDateTime(date, time) {
        let fDate = new Date(date).getTime();
        let timeArray = time.split(':');
        let insertedDate = fDate + ( (timeArray[0] * 60 * 60) + (timeArray[1] * 60)) * 1000;
        this.clearInterval = setInterval(() => {
            this.now = new Date().getTime();

            let distance = insertedDate - this.now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor((distance / (1000 * 60 *  60 * 24)));
            let hours = Math.floor((distance % (1000 * 60 *  60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.timeLeft = `${hours}h ${minutes}m ${seconds}s`;
            if(days !== 0){
                this.timeLeft = `${days} days ${this.timeLeft}`;
            }
            console.log(this.timeLeft);
        }, 1000);

    }
}