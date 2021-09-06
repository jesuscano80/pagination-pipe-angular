import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { FetchAllPokemonResponse } from '../interfaces/pokemon.interfaces';
import { Pokemon } from "../interfaces/pokemon.interfaces"
import  {Observable} from "rxjs";
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
private url: string= "https://pokeapi.co/api/v2"
  constructor(private http: HttpClient) { 

  }

  getAllPokemons():Observable<Pokemon[]>{
   return this.http.get<FetchAllPokemonResponse>(`${this.url}/pokemon?limit=1500`).pipe(
     map(this.transformSmallPokemonIntoPokemon)
   )
  }

  private transformSmallPokemonIntoPokemon(resp: FetchAllPokemonResponse):Pokemon[]{
    const pokemonList: Pokemon[]= resp.results.map(poke =>{
      const urlArr= poke.url.split("/");
      const id= urlArr[6];
      const pic= `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${id}.png`
      return {
        id,
        name: poke.name,
        pic
      }
    })
    return pokemonList
   
  }
}
