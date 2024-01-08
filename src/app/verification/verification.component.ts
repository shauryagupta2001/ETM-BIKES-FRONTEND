import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../httpservices';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit{
  constructor(private r:Router,private http:HttpService
){}
  currentCard: 'login' | 'upload' = 'login';
  username: string = '';
  password: string = '';
u:any
p:any
photos: any;
  login() {
    // Perform authentication logic, e.g., call a service to validate credentials
    // If authentication is successful, set currentCard to 'upload'
    if (this.username && this.password) {
      this.currentCard = 'upload';
    }
  }
ngOnInit(): void {
  this.http.getphotoData().subscribe(
    (data) => {
      this.photos = data.data; 
      console.log(data.data);
      // Assuming 'data' has a 'data' property with the array of photos
    },
    (error) => {
      console.error('Error fetching photos:', error);
    }
  );
}
  handleFileInput(input: any, index: number) {
    // Handle file input logic, e.g., preview file details
    console.log(`Selected file ${index}:`, input.files[0]);
  }

  uploadFile() {
    // Handle file upload logic here
    // This is a placeholder; you might want to upload the file to a server or perform other actions
  }

  showUploadCard() {
    this.currentCard = 'upload';
  }
  s(){
this.r.navigate(['/VE'])
  }
  private selectedAvatar: File | null = null;




  users = [
    {
      vin: 'ABC123',
      tlname: 'John Doe',
      ridername: 'Rider 1',
      hub: 'Hub 1',
      status: 'Active',
      dispatch: 'Yes',
      updatedAt: '2023-01-01T12:00:00Z',
    },
    {
      vin: 'DEF456',
      tlname: 'Jane Smith',
      ridername: 'Rider 2',
      hub: 'Hub 2',
      status: 'Inactive',
      dispatch: 'No',
      updatedAt: '2023-01-02T14:30:00Z',
    },
    // Add more dummy data as needed
  ];
  imageUrl: string | undefined;

 
  simulateFileUpload(): void {
    const dummyFile = new Blob(['dummy file content'], { type: 'text/plain' });
    const file = new File([dummyFile], 'dummyfile.txt', { type: 'text/plain' });

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  openWhatsApp() {
    // Replace '9027410158' with your actual WhatsApp number
    const phoneNumber = '9153924703';
    const message = 'Hello, I need help';

    // Create the WhatsApp deep link
    const whatsappLink = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(message)}`;

    // Open the link in a new window/tab
    window.open(whatsappLink, '_blank');
  }
  images: { url: string }[] = [];

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      // Assuming you want to limit to 4 images
      const selectedImages = Array.from(files).slice(0, 4);

      for (const file of selectedImages) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({ url: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }
  postData: any = {
    avatar: null,
    backImage: null,
    coverImage: null,
    frontImage: null,
  };
  
  uploadImages() {
    // Save images to local storage
   this.http.uploadAvatar(this.postData).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }

  avatar: File | undefined;
  coverImage: File | undefined;
  backImage: File | undefined;
  frontImage: File | undefined;

  onFileChanged(event: any, imageType: string): void {
    const file = event.target.files[0];

    if (file) {
      switch (imageType) {
        case 'avatar':
          this.avatar = file;
          break;
        case 'coverImage':
          this.coverImage = file;
          break;
        case 'backImage':
          this.backImage = file;
          break;
        case 'frontImage':
          this.frontImage = file;
          break;
      }
    }
  }
  uploadFiles(): void {
    const formData = new FormData();

    if (this.avatar) {
      formData.append('avatar', this.avatar);
    }

    if (this.coverImage) {
      formData.append('coverImage', this.coverImage);
    }

    if (this.backImage) {
      formData.append('backImage', this.backImage);
    }

    if (this.frontImage) {
      formData.append('frontImage', this.frontImage);
    }

    this.http.uploadAvatar(formData).subscribe(
      (response) => {
        console.log('Files uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading files:', error);
      }
    );
  }
}
