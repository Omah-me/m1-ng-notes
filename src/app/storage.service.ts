import { Injectable } from '@angular/core';
import { Tag } from './tag';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private tags: Tag[] = [];
  private notes: Note[] = [];

  private TAGS_KEY = 'tags';
  private NOTES_KEY = 'notes';

  constructor() {
    this.loadTags();
    this.loadNotes();
  }

  ////////////TAGS////////////////
  getTags(): Tag[] {
    return this.tags;
  }

  addTag(tag: Tag): void {
    const exists = this.tags.some(existingTag => existingTag.name === tag.name);
    if (!exists) {
      this.tags.push(tag);
      this.saveTags();
    } else {
      console.warn(`Le tag "${tag.name}" existe déjà.`);
    }
  }

  deleteTag(tagToDelete: Tag): void {
    this.tags = this.tags.filter(tag => tag.id !== tagToDelete.id);
    this.saveTags();
  }

  updateTag(updatedTag: Tag): void {
    const index = this.tags.findIndex(tag => tag.id === updatedTag.id);
    if (index !== -1) {
      this.tags[index] = updatedTag;
      this.saveTags();
    }
  }

  private saveTags(): void {
    localStorage.setItem(this.TAGS_KEY, JSON.stringify(this.tags));
  }

  private loadTags(): void {
    const storedTags = localStorage.getItem(this.TAGS_KEY);
    if (storedTags) {
      this.tags = JSON.parse(storedTags);
    }
  }

  ////////////// NOTES///////////////
  getNotes(): Note[] {
    return this.notes;
  }

  addNote(note: Note): void {
    const exists = this.notes.some(existingNote => existingNote.title === note.title);
    if (!exists) {
      this.notes.push(note);
      this.saveNotes();
    } else {
      console.warn(`La note "${note.title}" existe déjà.`);
    }
  }

  deleteNote(noteToDelete: Note): void {
    this.notes = this.notes.filter(note => note.id !== noteToDelete.id);
    this.saveNotes();
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
      this.saveNotes();
    }
  }

  private saveNotes(): void {
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(this.notes));
  }

  private loadNotes(): void {
    const storedNotes = localStorage.getItem(this.NOTES_KEY);
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
    }
  }
}
