import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styles: [``],
})
export class ListPageComponent implements OnInit{
  heroes: Hero[] = [];

  constructor(private heroesServices: HeroesService){}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(){
    this.heroesServices.getHeroes()
    .subscribe(result=>this.heroes = result);
  }
}
