import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: [``],
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroesService: HeroesService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ){}

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ]

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit() {
    if( !this.router.url.includes('edit') ) return;

    this.activatedRouter.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id)),
    )
    .subscribe(hero =>  {
      if(!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);
      return;
    })
  }

  onSubmit() {
    if ( this.heroForm.invalid) return;

    if( this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe( hero => {
          // TODO: mostrar snackbar
        });

      return;
    }

    this.heroesService.addHero(this.currentHero)
    .subscribe(hero => {
      //TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id
    })
  }
}
