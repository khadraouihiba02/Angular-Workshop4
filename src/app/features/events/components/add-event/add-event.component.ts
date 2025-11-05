import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { futurDateValidator } from '../../../../shared/validators/futur-date.validator';
import { EventService } from '../../../../data-acess/event.service';
import { Event } from '../../../../models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {

  constructor(private eventService: EventService, private router: Router) {}

  eventForm = new FormGroup({
    titre: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30)
    ]),
    date: new FormControl('', [
      Validators.required,
      futurDateValidator(7)
    ]),
    lieu: new FormControl('', Validators.required),
    prix: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d+(\\.\\d+)?$')
    ]),
    nbPlaces: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9][0-9]?$|^100$')
    ]),
    imageUrl: new FormControl('')
  });

  addEvent() {
    if (this.eventForm.valid) {
      const raw = this.eventForm.getRawValue();
      const newEvent: Event = {
        id: Math.floor(Math.random() * 1000),
        titre: raw.titre!,
        description: raw.description!,
        date: new Date(raw.date!),
        lieu: raw.lieu!,
        prix: parseFloat(raw.prix!),
        nbPlaces: Number(raw.nbPlaces!),
        imageUrl: raw.imageUrl || 'assets/images/default.jpg',
        nbLikes: 0,
        organisateurId: 1
      };

      this.eventService.addEvent(newEvent);
      alert('✅ Événement ajouté avec succès !');
      this.router.navigate(['/events']); // retour à la liste
    }
  }
}
