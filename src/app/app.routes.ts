import { Routes } from '@angular/router';
import { VehicleComponent } from './vehicle/vehicle.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { FinanceComponent } from './finance/finance.component';
import { TlDashboardComponent } from './tl-dashboard/tl-dashboard.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { VerificationComponent } from './verification/verification.component';
import { TehComponent } from './teh/teh.component';
import { TrackComponent } from './track/track.component';
import { SubscComponent } from './subsc/subsc.component';

export const routes: Routes = [
        
        {path:'',component:VerificationComponent},
        {path:'re',component:RecoveryComponent},
        {path:'VE',component:VehicleComponent},
        {path:'fi',component:FinanceComponent},
        {path:'tl',component:TlDashboardComponent},
        {path:'io',component:MaintenanceComponent},
        {path:'ter',component:TehComponent},
        {path:'track',component:TrackComponent},
        {path:'sb',component:SubscComponent},
       
      
];
