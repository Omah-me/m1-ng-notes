import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from '../note';
import { Tag } from '../tag';
import { StorageService } from '../storage.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  loaded: boolean = false;
  notes: Note[] = [];
  tags: Tag[] = [];
  editing?: Note;

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadTags();
  }

  loadNotes(): void {
    this.notes = this.storage.getNotes();
    this.loaded = true;
  }

  loadTags(): void {
    this.tags = this.storage.getTags();
  }

  dialogAddNote(event: Event): void {
    event.preventDefault();
    if (this.tags.length === 0) {
      window.alert('Ajoutez d’abord au moins un tag avant de créer une note.');
      return;
    }

    const noteTitle = window.prompt('Titre de la note');
    if (!noteTitle || noteTitle.trim() === '') return;

    const noteContent = window.prompt('Contenu de la note') || '';

    
    const tagList = this.tags.map((t, i) => `${i + 1}. ${t.name}`).join('\n');
    const selected = window.prompt(`Choisir un tag (numéro) :\n${tagList}`);
    const tagIndex = selected ? parseInt(selected) - 1 : -1;

    if (tagIndex >= 0 && tagIndex < this.tags.length) {
      const selectedTag = this.tags[tagIndex];
      const newNote = new Note(noteTitle, noteContent, [selectedTag]);
      this.storage.addNote(newNote);
      this.loadNotes();
    } else {
      window.alert('Tag invalide, création annulée.');
    }
  }

  deleteNote(noteToDelete: Note): void {
    const confirmed = window.confirm(`Supprimer la note "${noteToDelete.title}" ?`);
    if (confirmed) {
      this.storage.deleteNote(noteToDelete);
      this.loadNotes();
    }
  }

  getTagName(note: Note): string {
    return note.tags.length > 0 ? note.tags[0].name : '(Aucun tag)';
  }
}
