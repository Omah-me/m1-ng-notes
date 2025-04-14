import { Injectable } from '@angular/core';
import { Tag } from './tag'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private tags: Tag[] = [];
  private TAGS_KEY = 'tags'; 

  constructor() {
    this.loadTags(); 
  }

  
  getTags(): Tag[] {
    return this.tags;
  }

  deleteTag(tagToDelete: Tag): void {
    this.tags = this.tags.filter(tag => tag.id !== tagToDelete.id);
    this.saveTags();
  }
  

  private saveTags(): void {
    localStorage.setItem(this.TAGS_KEY, JSON.stringify(this.tags));
  }

  loadTags(): void {
    const storedTags = localStorage.getItem(this.TAGS_KEY);
    if (storedTags) {
      this.tags = JSON.parse(storedTags);
    }
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

  updateTag(updatedTag: Tag): void {
    const index = this.tags.findIndex(tag => tag.id === updatedTag.id);
    if (index !== -1) {
      this.tags[index] = updatedTag; // Remplace l'ancien tag par le nouveau
      this.saveTags();
    }
  }
}