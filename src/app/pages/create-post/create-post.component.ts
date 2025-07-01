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
    apartmentName: new FormControl('', Validators.required),
    ownerName: new FormControl('', Validators.required),
    shared: new FormControl('No', Validators.required),
    area: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    negotiable: new FormControl(true),
    priceMode1: new FormControl(true),
    utilityIncluded: new FormControl(false),
    furnished: new FormControl('No', Validators.required),
    amenities: new FormArray([]),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  get apartmentName() {
    return this.postFormGroup.get('apartmentName');
  }
  get ownerName() {
    return this.postFormGroup.get('ownerName');
  }
  get shared() {
    return this.postFormGroup.get('shared');
  }
  get area() {
    return this.postFormGroup.get('area');
  }
  get utilityIncluded() {
    return this.postFormGroup.get('utilityIncluded');
  }
  get furnished() {
    return this.postFormGroup.get('furnished');
  }
  get title() {
    return this.postFormGroup.get('title');
  }
  get description() {
    return this.postFormGroup.get('description');
  }


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
    if (this.postFormGroup.invalid) {
      this.postFormGroup.markAllAsTouched();
      return;
    }

    const formValue = this.postFormGroup.value;
    const amenities = (this.postFormGroup.get('amenities') as FormArray).value;
    const finalData = {
      ...formValue,
      amenities
    };

    console.log(finalData); // Send to API or store
  }

}
