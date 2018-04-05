import { Component } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import './login.component.less';

@Component({
    selector: 'login-component',
    template:  require('./login.component.html'),
    styleUrls: ['']
})
export class LoginComponent {
	private pressed: boolean = false;

    constructor(private _electronService: ElectronService) { }

    public login(){
        console.log("test");
        this._electronService.ipcRenderer.sendSync('login-success');
    }
};