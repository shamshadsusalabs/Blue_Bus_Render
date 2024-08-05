import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',

    loadComponent: () => import('./_SharedComponent/all-component/all-component.component').then(c => c.AllComponentComponent)
  },
  {
    path: 'Booking',

    loadComponent: () => import('./Booking/booking/booking.component').then(c => c.BookingComponent)
  },

  {
    path: 'Admin',

    loadComponent: () => import('./_Admin/dashboard/dashboard.component').then(c => c.DashboardComponent),
    children: [{
      path: 'Add-bus',

      loadComponent: () => import('./_Admin/add-buses/add-buses.component').then(c => c.AddBusesComponent)

    }]

  },


  {
    path: 'Operator-login',

    loadComponent: () => import('./_Authentication/operator-login/operator-login.component').then(c => c.OperatorLoginComponent)
  },
  {
    path: 'user-login',

    loadComponent: () => import('./_Authentication/user/user.component').then(c => c.UserComponent)
  },

];
