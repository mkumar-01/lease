import { Component, inject } from '@angular/core';
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
import { Property } from '../../store/models/property.model';
import { Router } from '@angular/router';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DialogComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  private router = inject(Router);
  allState: string[] = [
    "Andhra Pradesh",
    "Arunachal Pradesh ",
    "Assam Bihar ",
    "Chhattisgarh ",
    "Goa ",
    "Gujarat ",
    "Haryana ",
    "Himachal Pradesh ",
    "Jharkhand Karnataka ",
    "Kerala ",
    "Madhya Pradesh",
    "Maharashtra ",
    "Manipur ",
    "Meghalaya ",
    "Mizoram ",
    "Nagaland ",
    "Odisha ",
    "Punjab ",
    "Rajasthan",
    "Sikkim ",
    "Tamil Nadu ",
    "Telangana ",
    "Tripura ",
    "Uttar Pradesh ",
    "Uttarakhand ",
    "West Bengal",
  ];
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
    description: new FormControl('', Validators.required),
    rent: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    district: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
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
  get rent() {
    return this.postFormGroup.get('rent');
  }
  get district() {
    return this.postFormGroup.get('district');
  }
  get state() {
    return this.postFormGroup.get('state');
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

    this.updateRecord(finalData);
    this.postFormGroup.reset()
  }
  updateRecord(newRecord: any) {
    const localData = localStorage.getItem('data');
    if (localData) {
      const parsedData = JSON.parse(localData) as any[];
      const newID = 1 + parsedData[parsedData.length - 1].id;
      const newData = {
        id: newID,
        ownerName: newRecord.ownerName,
        picture: "assets/data/apartment-4.jpg",
        apartmentName: newRecord.apartmentName,
        propertyLocation: {
          area: newRecord.district,
          state: newRecord.state
        },
        propertyDetail: {
          area: newRecord.area,
          leaseType: "Long term "
        },
        expectedRent: {
          expectedRent: newRecord.rent,
          isNegotiable: newRecord.negotiable,
          priceMode: newRecord.priceMode1
        },
        furnished: newRecord.furnished,
        amenitiesIncluded: newRecord.amenities,
        shared: newRecord.shared,
        otherDescription: {
          title: newRecord.title,
          description: newRecord.description
        },
        featured: "false",
        userComments: []
      };

      parsedData.push(newData);
      localStorage.removeItem('data');
      localStorage.setItem('data', JSON.stringify(parsedData));
      this.router.navigate(['/dashboard'])
    }
  }


}
