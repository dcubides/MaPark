import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Ubicación parques',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Lista de parques',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Nuevo parque',
      url: '/newpark',
      icon: 'add-circle-outline'
    },
    {
      title: 'Policia',
      url: '/policia',
      icon: 'walk'
    },
    {
      title: 'Salir',
      url: '/',
      icon: 'exit',
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
