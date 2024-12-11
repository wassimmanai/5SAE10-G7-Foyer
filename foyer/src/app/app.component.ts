import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // User-related properties
  users: any[] = [];
  user: any = {};
  isEditingUser: boolean = false;

  // InsEvent-related properties
  insEvents: any[] = [];
  insEvent: any = {};
  isEditingInsEvent: boolean = false;

  // Comment-related properties
  comments: any[] = [];
  comment: any = {};
  isEditingComment: boolean = false;

  // Evenement-related properties
  evenements: any[] = [];
  evenement: any = {};
  isEditingEvenement: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllInsEvents();
    this.getAllComments();
    this.getAllEvenements();
  }

  // User Methods
  getAllUsers(): void {
    this.apiService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onSubmitUser(): void {
    if (this.isEditingUser) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser(): void {
    this.apiService.addUser(this.user).subscribe((newUser) => {
      this.users.push(newUser);
      this.user = {};
    });
  }

  removeUser(userId: number): void {
    this.apiService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== userId);
    });
  }

  editUser(user: any): void {
    this.user = { ...user };
    this.isEditingUser = true;
  }

  updateUser(): void {
    this.apiService.updateUser(this.user).subscribe((updatedUser) => {
      const index = this.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.resetUserForm();
    });
  }

  resetUserForm(): void {
    this.user = {};
    this.isEditingUser = false;
  }

  // InsEvent Methods
  getAllInsEvents(): void {
    this.apiService.getAllInsEvents().subscribe((insEvents) => {
      this.insEvents = insEvents;
    });
  }

  onSubmitInsEvent(): void {
    if (this.isEditingInsEvent) {
      this.updateInsEvent();
    } else {
      this.addInsEvent();
    }
  }

  addInsEvent(): void {
    this.apiService.addInsEvent(this.insEvent).subscribe((newInsEvent) => {
      this.insEvents.push(newInsEvent);
      this.insEvent = {};
    });
  }

  removeInsEvent(id: number): void {
    this.apiService.deleteInsEvent(id).subscribe(() => {
      this.insEvents = this.insEvents.filter((insEvent) => insEvent.id !== id);
    });
  }

  editInsEvent(insEvent: any): void {
    this.insEvent = { ...insEvent };
    this.isEditingInsEvent = true;
  }

  updateInsEvent(): void {
    this.apiService.updateInsEvent(this.insEvent).subscribe((updatedInsEvent) => {
      const index = this.insEvents.findIndex((e) => e.id === updatedInsEvent.id);
      if (index !== -1) {
        this.insEvents[index] = updatedInsEvent;
      }
      this.resetInsEventForm();
    });
  }

  resetInsEventForm(): void {
    this.insEvent = {};
    this.isEditingInsEvent = false;
  }

  // Comment Methods
  getAllComments(): void {
    this.apiService.getAllComments().subscribe((comments) => {
      this.comments = comments;
    });
  }

  onSubmitComment(): void {
    if (this.isEditingComment) {
      this.updateComment();
    } else {
      this.addComment();
    }
  }

  addComment(): void {
    this.apiService.addStandaloneComment(this.comment).subscribe((newComment) => {
      this.comments.push(newComment);
      this.comment = {};
    });
  }

  removeComment(commentId: number): void {
    this.apiService.deleteStandaloneComment(commentId).subscribe(() => {
      this.comments = this.comments.filter((comment) => comment.id !== commentId);
    });
  }

  editComment(comment: any): void {
    this.comment = { ...comment };
    this.isEditingComment = true;
  }

  updateComment(): void {
    this.apiService.updateStandaloneComment(this.comment).subscribe((updatedComment) => {
      const index = this.comments.findIndex((c) => c.id === updatedComment.id);
      if (index !== -1) {
        this.comments[index] = updatedComment;
      }
      this.resetCommentForm();
    });
  }

  resetCommentForm(): void {
    this.comment = {};
    this.isEditingComment = false;
  }

  // Evenement Methods
  getAllEvenements(): void {
    this.apiService.getAllEvenements().subscribe((evenements) => {
      this.evenements = evenements;
    });
  }

  onSubmitEvenement(): void {
    if (this.isEditingEvenement) {
      this.updateEvenement();
    } else {
      this.addEvenement();
    }
  }

  addEvenement(): void {
    this.apiService.addEvenement(this.evenement).subscribe((newEvenement) => {
      this.evenements.push(newEvenement);
      this.evenement = {};
    });
  }

  removeEvenement(id: number): void {
    this.apiService.deleteEvenement(id).subscribe(() => {
      this.evenements = this.evenements.filter((evenement) => evenement.id !== id);
    });
  }

  editEvenement(evenement: any): void {
    this.evenement = { ...evenement };
    this.isEditingEvenement = true;
  }

  updateEvenement(): void {
    this.apiService.updateEvenement(this.evenement.id, this.evenement).subscribe((updatedEvenement) => {
      const index = this.evenements.findIndex((e) => e.id === updatedEvenement.id);
      if (index !== -1) {
        this.evenements[index] = updatedEvenement;
      }
      this.resetEvenementForm();
    });
  }

  resetEvenementForm(): void {
    this.evenement = {};
    this.isEditingEvenement = false;
  }
}
