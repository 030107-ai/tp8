import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ParkService } from '../../services/park-service';
import { Park } from '../../models/park';

@Component({
  selector: 'app-park-list',
  imports: [RouterLink],
  templateUrl: './park-list.html',
  styleUrl: './park-list.css',
})
export class ParkList implements OnInit {
  private readonly parkService = inject(ParkService);
  private readonly router = inject(Router);

  parks = this.parkService.parks;

  ngOnInit(): void {
    this.parkService.getParks().subscribe({
      error: () => this.router.navigate(['/error']),
    });
  }

  onLike(park: Park): void {
    this.parkService
      .updatePark({ ...park, nbLikes: park.nbLikes + 1 })
      .subscribe({ error: () => this.router.navigate(['/error']) });
  }

  onDelete(park: Park): void {
    this.parkService
      .deletePark(park.id)
      .subscribe({ error: () => this.router.navigate(['/error']) });
  }
}
