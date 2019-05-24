import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login',
   loadChildren: './login/login.module#LoginPageModule'
   },
  { path: 'newpark',
   loadChildren: './newpark/newpark.module#NewparkPageModule'
  },
  { path: 'park-detail/:Id',
   loadChildren: './park-detail/park-detail.module#ParkDetailPageModule'
   },
  { path: 'tutorial/:Id',
   loadChildren: './inventario/tutorial/tutorial.module#TutorialPageModule'
  },
  { path: 'inventario/:Id',
   loadChildren: './inventario/inventario/inventario.module#InventarioPageModule'
  },
  { path: 'modal-ubicacion',
   loadChildren: './modal-ubicacion/modal-ubicacion.module#ModalUbicacionPageModule' },
  { path: 'policia',
    loadChildren: './policia/policia.module#PoliciaPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
