import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  amenitiesList: string[] = [
    'Gym Fitness',
    'Power Backup',
    'Plant Security System',
    'Swimming Pool',
    'Garbage Disposal',
    'Laundary service',
    'Car Park',
    'Private Lawn',
    'Elevator',
    'Visitors Parking',
    'Water heater'
  ];

  postFormGroup = new FormGroup({
    chooseApartment: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    shared: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    negotiable: new FormControl(false),
    priceMode1: new FormControl(false),
    utilityIncluded: new FormControl(false),
    furnished: new FormControl('', Validators.required),
    amenities: new FormArray([]),
    title: new FormControl(''),
    description: new FormControl('')
  });

  // Handle amenities toggle
  onAmenityChange(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    const amenities = this.postFormGroup.get('amenities') as FormArray;
    if (checkbox.checked) {
      amenities.push(new FormControl(checkbox.value));
    } else {
      const index = amenities.controls.findIndex(x => x.value === checkbox.value);
      if (index >= 0) {
        amenities.removeAt(index);
      }
    }
  }

  onSubmit() {
    console.log(this.postFormGroup.value);
  }
}
