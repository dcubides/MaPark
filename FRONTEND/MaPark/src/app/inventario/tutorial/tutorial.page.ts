import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ServiceAPIService } from '../../services/service-api.service';
import { IParques } from '../../Interfaces/iparques';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  id;
  constructor(
    private routes: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.id = this.routes.snapshot.paramMap.get('Id');
  }

  async finish() {
     await this.storage.set('tutorialComplete', true);
     this.router.navigateByUrl('inventario/' + this.id);
   }

}
