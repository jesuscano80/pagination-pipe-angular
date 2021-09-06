import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.scss']
})
export class PokemonlistComponent implements OnInit {
  public pokemons: Pokemon[]=[];
  public page: number=0;
  public search: string="";
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getAllPokemons().subscribe( (res)=> this.pokemons= res)

  }

nextPage(){
  this.page+=5;
}

prevPage(){
  if (this.page>0){
  this.page-=5;
}
}
onSearchPokemon(text:string){
  this.page=0;
this.search= text;
}

}
