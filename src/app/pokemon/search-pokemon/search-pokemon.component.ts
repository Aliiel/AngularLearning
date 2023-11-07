import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {

  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {


  }

  ngOnInit(): void {
    
    this.pokemons$ = this.searchTerms
      .pipe(
        debounceTime(300),  // permet d'attendre 300 ms avant l'envoie de la donnée au serveur afin d'éviter trop d'envois inutiles (permettre à l'utilisateur le temps d'écrire le mot souhaité avant d'envoyer la requête au serveur)
        distinctUntilChanged(), // permet d'éviter l'envoi de requêtes en doublon, élimine les requêtes qui sont successivement identiques / ici concrètement cet opérateur va attendre qu'il y ait un changement dans le flux des données avant de les envoyer au serveur
        switchMap((term) => this.pokemonService.searchPokemonList(term))
      );
  }

  search(term: string) {

    this.searchTerms.next(term);
  }

  goToDetailPokemon(pokemon: Pokemon) {

    const link = ['/pokemon', pokemon.id];

    this.router.navigate(link);
  }

}
