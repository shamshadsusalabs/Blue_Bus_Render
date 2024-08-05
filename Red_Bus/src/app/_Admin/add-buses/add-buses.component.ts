import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusService } from '../../_service/bus.service';
import { Bus } from '../../Modal/Bus';
import Swal from 'sweetalert2';
//rfjfrj
@Component({
  selector: 'app-add-buses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-buses.component.html',
  styleUrls: ['./add-buses.component.css'],
})
export class AddBusesComponent implements OnInit {
  busForm!: FormGroup;

  constructor(private fb: FormBuilder, private busService: BusService) {}

  ngOnInit(): void {
    this.busForm = this.fb.group({
      operatorName: ['', Validators.required],
      busType: ['', Validators.required],
      busName: ['', Validators.required],
      pickUpLocation: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      pickUpTime: ['', Validators.required],
      pickUpAmPm: ['AM', Validators.required],
      dropDate: ['', Validators.required],
      dropTime: ['', Validators.required],
      dropAmPm: ['AM', Validators.required],
      dropLocation: ['', Validators.required],
      subLocations: this.fb.array([]),
      totalSeats: [1, [Validators.required, Validators.min(1)]],
      busImages: this.fb.array([]),
      fare: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get subLocations(): FormArray {
    return this.busForm.get('subLocations') as FormArray;
  }

  get busImages(): FormArray {
    return this.busForm.get('busImages') as FormArray;
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const base64String = (e.target?.result as string).split(',')[1];
          this.busImages.push(this.fb.group({
            fileUrl: [base64String, Validators.required]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  }

  addSubLocation(): void {
    this.subLocations.push(this.fb.group({
      location: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      amPm: ['AM', Validators.required]
    }));
  }

  removeSubLocation(index: number): void {
    this.subLocations.removeAt(index);
  }

  submit(): void {
    if (this.busForm.valid) {
      Swal.fire({
        title: 'Please wait...',
        text: 'Adding bus...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const bus: Bus = this.busForm.value;
      this.busService.createBus(bus).subscribe(
        (response) => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Bus Added',
            text: 'Bus added successfully!',
          });
        },
        (error) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error adding the bus. Please try again.',
          });
        }
      );
    } else {
      this.showValidationErrors();
    }
  }

  private showValidationErrors(): void {
    const errors: string[] = [];
    Object.keys(this.busForm.controls).forEach(key => {
      const controlErrors = this.busForm.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          errors.push(`${key}: ${errorKey}`);
        });
      }
    });

    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      html: '<ul style="text-align: left;">' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>',
    });
  }
}
