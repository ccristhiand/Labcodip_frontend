import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {

  constructor( private spinner : SpinnerService) { }
  
  loading = this.spinner.isLoading;

  ngOnInit(): void {
  }

}
