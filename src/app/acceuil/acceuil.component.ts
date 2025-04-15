import { Component } from '@angular/core';
import { Note } from '../note';
import { StorageService } from '../storage.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {
  notes: Note[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.notes = this.storage.getNotes();
  }

  getTagName(note: Note): string {
    return note.tags.length > 0 ? note.tags[0].name : '(Aucun tag)';
  }

  getTagColor(note: Note): string {
    return note.tags.length > 0 ? note.tags[0].color : '#999';
  }
}
