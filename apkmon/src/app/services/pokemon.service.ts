import PokeAPI from 'pokeapi-typescript';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {OnInit} from '@angular/core';

type Pokemon = {
  forms:string;
  uniqueId:string;
  id:string;
  img:string;
  description:string;
  types:string[];
  /* (Rodrigo): uma soluçao ideal é colocar a array abaixo *fora* do objeto e fazer um moves.
  service pra tratar os moves de cada obj Pokemon baseados no seu id, já que vai dar 
  trabalho popular isso daqui pra poder enfiar na pokemonParty, mas da pra fazer
  */
  availableMoves:string[];
  stats:number[];
  selectedMoves:string[];
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService{
  
  constructor(private storage: Storage) { }
  private requestedPkmnList;
  private Pokemon = {
    id: ""
  } as Pokemon;
  
  // a ideia é mandar essa array de Pokemons pra localStorage e *depois* iterar pela lista na hora de enviar pro server
  private pokemonParty:Pokemon[] = [
    ];
  // (Rodrigo): essa função desmonta o obj Pokemon que a API retorna e popula as propriedades do obj Pokemon presente nesse arquivo.
  /*
  (Rodrigo): "nao eh mais fácil só usar o objeto que API retorna?"
  bom, nao: é chato pra caralho ter que ficar iterando naquele obj, e o APP só usa alguns dados bem específicos daquilo, o resto é basicamente inutil
  */
  public async searchPokemon(id: string) {
    const result = await PokeAPI.Pokemon.resolve(id);
    const speciesReq = await PokeAPI.PokemonSpecies.resolve(result.species.name);
    //console.log(speciesReq);
    console.log(speciesReq.flavor_text_entries[1].flavor_text);
    this.Pokemon.id = result.name.toString();
    this.Pokemon.description = speciesReq.flavor_text_entries[1].flavor_text;
    this.Pokemon.img = result.sprites.front_default;
    
    
    const {moves}  = {...result};
    
    const {stats}  = {...result};
    this.Pokemon.uniqueId = result.name;
    this.Pokemon.availableMoves = [];
    this.Pokemon.stats = [];
    this.Pokemon.types = [];
    this.Pokemon.selectedMoves = ["", "Not Selected","Not Selected","Not Selected"]
    for(let i = 0;i<result.moves.length;i++){
      this.Pokemon.availableMoves[i] = result.moves[i].move.name;
    }
    for(let i = 0;i<result.types.length;i++){
      this.Pokemon.types[i] = result.types[i].type.name;
    }
    for(let i = 0;i<this.Pokemon.selectedMoves.length;i++){
      this.Pokemon.selectedMoves[i] = this.Pokemon.availableMoves[i];
    }
    for(let i = 0;i<stats.length;i++){
       this.Pokemon.stats[i] = stats[i].base_stat;
    }
    
    console.log(result);
    // console.log(this.Pokemon.stats);
    // console.log(stats);
    // console.log(moves);
    //return result;
  }
  public addPoint(stat:number){
    if(this.Pokemon.stats[stat] == 150){
      return 0;
    }
    let temp = this.Pokemon.stats[stat];
    this.Pokemon.stats[stat] = temp+1;
  }
  public dimPoint(stat:number){
    if(this.Pokemon.stats[stat] == 0){
      return 0;
    }
    let temp = this.Pokemon.stats[stat];
    this.Pokemon.stats[stat] = temp-1;
  }
  public deleteFromParty(uniqueId:string){
    for(let i = 0;i<this.pokemonParty.length;i++){
      if(uniqueId == this.pokemonParty[i].uniqueId){
        const teste = this.pokemonParty[i];
        console.log(teste);
        this.pokemonParty.splice(i,1);
      }
    }
    this.updateLocalList();
  }

  public async requestList(firstId: number, lastId: number) {
    const fetchedList = await PokeAPI.Pokemon.list(lastId, firstId);
    const { results } = fetchedList;
    this.setResultados(results);
    return results;
  }
  public addPokemonToParty(poke:Pokemon){
    for(let i = 0; i < this.pokemonParty.length;i++){
      if(poke.uniqueId == this.pokemonParty[i].uniqueId){
        this.pokemonParty[i] = {...poke}
        
      }
      console.log(poke);
    }
    this.pokemonParty.push(poke);
    //console.log(this.pokemonParty);
    this.updateLocalList();
  }
  public updateLocalList(){
    this.storage.set('PkmnParty', this.pokemonParty);
  }
  public async getLocalList(){
    return await this.storage.get('PkmnParty');
  }
  // essa getParty vai ser util na hora de montar a Inventory (tab4)
  public getParty(): Readonly<Pokemon>[]{
    return this.pokemonParty;
  }
  public setResultados(result) {
    this.requestedPkmnList = result;
  }
  // existe uma diferença importante aqui: getPokemon faz uma request pra API, getCurrentPokemon não faz nenhuma request e puxa o objeto Pokemon do jeito que ele está aqui nesse arquivo. 
  //uniqueId é um parametro opcional que só vai ser usado lá na tab inventory, pra ver se ja existe esse poke na party
  public async getPokemon(id: string, uniqueId?:string){
  
    let naosei = true;
    for(let i = 0;i<this.pokemonParty.length;i++){
      console.log(uniqueId);
      if(uniqueId == this.pokemonParty[i].uniqueId){
        this.Pokemon = {...this.pokemonParty[i]}; 
        naosei=false;
      }
    }
    if(naosei){
      await this.searchPokemon(id);
    }
    
    return this.Pokemon;
  }
  public getCurrentPokemon(){
    if(this.Pokemon.id == ""){
      this.Pokemon = this.pokemonParty[0];
    }
    return {...this.Pokemon};
  }
  //(Rodrigo): nao sei pq fiz essa funçao, admito
  public getList(){
    return this.requestedPkmnList;
  }
  


}
