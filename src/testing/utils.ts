import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import {
  Store,
  StateObservable,
  ActionsSubject,
  ReducerManager,
  StoreModule
} from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserFacade } from '../app/core/auth-fire/auth-fire.facade';

import { environment } from '../environments/environment';

// Register & sanitize SVG icons
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Injectable()
export class MockStore<T> extends Store<T> {
  private stateSubject = new BehaviorSubject<T>({} as T);

  constructor(
    state$: StateObservable,
    actionsObserver: ActionsSubject,
    reducerManager: ReducerManager
  ) {
    super(state$, actionsObserver, reducerManager);
    this.source = this.stateSubject.asObservable();
  }

  setState(nextState: T) {
    this.stateSubject.next(nextState);
  }
}

export function provideMockStore() {
  return {
    provide: Store,
    useClass: MockStore
  };
}

@NgModule({
  imports: [
    NoopAnimationsModule,
    RouterTestingModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      'app-maker-developers'
    ),
    AngularFireAuthModule,
    AngularFirestoreModule,
    TranslateModule.forRoot(),
    StoreModule.forRoot({})
  ],
  exports: [
    NoopAnimationsModule,
    RouterTestingModule,
    SharedModule,
    TranslateModule
  ],
  providers: [provideMockStore(), UserFacade]
})
export class TestingModule {
  constructor(sanitizer: DomSanitizer, iconRegistry: MatIconRegistry) {
    iconRegistry.addSvgIcon(
      'google-ic',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/social-icons/google.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'facebook-ic',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/social-icons/facebook.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'twitter-ic',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/social-icons/twitter.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'github-ic',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/social-icons/github.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'mail-ic',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/social-icons/mail.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'phone-ic',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/social-icons/phone.svg'
      )
    );
  }
}
