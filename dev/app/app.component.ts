import { Component} from '@angular/core';
import './app.component.less';

@Component({
    selector: 'electron-app',
    template:  require('./app.component.html')
})

export class AppComponent{
    private text: string = '';

    constructor() {}
    
};
