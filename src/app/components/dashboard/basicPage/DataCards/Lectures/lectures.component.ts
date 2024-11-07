import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-lectures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.scss'
})
export class LecturesComponent implements AfterViewInit{
  loading : boolean = true ;
  ngAfterViewInit(): void {

    //? in real project u will delete the [time out] and only need the [loading = false ]
    setTimeout(() => {
      this.loading = false;
    }, Math.floor(Math.random() * 2000) + 1000); //* random time between 1 and 3 sec
  }

}
