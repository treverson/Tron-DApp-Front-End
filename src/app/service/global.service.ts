import { Injectable } from '@angular/core';

@Injectable()
export class Global {

    // signin signout state (handled in navigation.component.ts & login.component.ts & signup.component.ts)
    state: string;
    
}
