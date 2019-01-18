import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Global } from 'app/service/global.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector     : 'fuse-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavigationComponent implements OnInit
{
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    // Private
    private state:string;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     *
     */
    constructor(
        private router: Router,
        public globalService:Global,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });

            if(JSON.parse(localStorage.getItem('userToken'))) {
                this.globalService.state = "SIGNOUT";
                if(window.innerWidth < 1025) {
                    this.navigation[6].title = "SIGNOUT";
                    this.navigation[6].id = "signout";
                    this.navigation[6].url = "/home";
                }
            }
            else {
                this.globalService.state = "SIGNUP";
                this.navigation[6].title = "SIGNUP";
            }
    }
    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    redirect(val) {
        if(val == "SIGNOUT") {
            localStorage.removeItem('userToken');
            this.globalService.state = "SIGNUP";
            this.router.navigate(['/login']);
        }
        else if (val == "SIGNUP") {
            this.router.navigate(['/signup']);
        }
    }
}
