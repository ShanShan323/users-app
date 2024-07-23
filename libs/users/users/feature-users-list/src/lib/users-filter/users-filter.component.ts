import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterKey } from '@users/core/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnDestroy, OnInit {
  @Output() filterUser: EventEmitter<FilterKey> = new EventEmitter<FilterKey>();

  private readonly subscription: Subscription;
  public name: FormControl = new FormControl('');

  constructor() {
    this.subscription = this.name.valueChanges.subscribe((value: string) => {
      this.filterUser.emit({ name: value.toLowerCase() });
    });
  }

  ngOnInit(): void {
    this.name.setValue('');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
