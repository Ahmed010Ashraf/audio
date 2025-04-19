import { Routes } from '@angular/router';
import { QuranComponent } from './components/quran/quran.component';
import { podcastsComponent } from './components/technology/technology/technology.component';
import { MusicComponent } from './components/music/music.component';
import { HomeComponent } from './components/home/home.component';
import { UploadeComponent } from './components/uploade/uploade.component';
import { audiobooksComponent } from './components/entertainment/entertainment.component';

export const routes: Routes = [
  {path:"" , redirectTo:"home" , pathMatch:"full"},
  {path:"home" , component:HomeComponent},
  {path:"quran", component:QuranComponent},
  {path:"audiobooks", component:audiobooksComponent},
  {path:"podcasts", component:podcastsComponent},
  {path:"music",component:MusicComponent},
  {path:"uploade",component:UploadeComponent}
];
