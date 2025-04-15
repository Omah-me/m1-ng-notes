import { Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { NoteComponent } from './note/note.component';
import { AcceuilComponent } from './acceuil/acceuil.component';


export const routes: Routes = [
    {path:'tags',component: TagsComponent},
    { path: 'note', component: NoteComponent },
    { path: '', component: AcceuilComponent }

];
