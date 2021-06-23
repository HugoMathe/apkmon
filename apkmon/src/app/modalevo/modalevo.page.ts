import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';



@Component({
  selector: 'app-modalevo',
  templateUrl: 'modalevo.page.html',
  styleUrls: ['modalevo.page.scss']
})
export class ModalevoPage implements OnInit {

  constructor(private pokeService: PokemonService,private modalController:ModalController) {}
  ngOnInit() {
    this.refresh();
    this.loadPokemon();
  }
  public Pokemon;

  public async setPokemon(){
    this.Pokemon = await this.pokeService.getCurrentPokemon();
  }
  public refresh(){
    setInterval(()=> this.setPokemon(), 5000);
  }

  public hideMe:boolean = false;
  public hideMe1:boolean = false;
  public hideMe2:boolean = false;
  public hideMe3:boolean = false;
  public hideMe4:boolean = false;

  OpenModal(){
    this.modalController.create({component:ModalevoPage}).then((modalElement)=>{modalElement.present();})
  }
     CloseModal()
  {
    this.modalController.dismiss();
  }
  hide() {
    switch(this.hideMe){
      case true:
        this.hideMe = false;
        break;
      case false:
        this.hideMe = true;
        break;
    }
  }
  hide1() {
    switch(this.hideMe1){
      case true:
        this.hideMe1 = false;
        break;
      case false:
        this.hideMe1 = true;
        break;
    }
  }
  hide2() {
    switch(this.hideMe2){
      case true:
        this.hideMe2 = false;
        break;
      case false:
        this.hideMe2 = true;
        break;
    }
  }
  hide3() {
    switch(this.hideMe3){
      case true:
        this.hideMe3 = false;
        break;
      case false:
        this.hideMe3 = true;
        break;
    }
  }
  hide4() {
    switch(this.hideMe4){
      case true:
        this.hideMe4 = false;
        break;
      case false:
        this.hideMe4 = true;
        break;
    }
  }


  public getARandomNum() {
    let randomN: number = Math.floor(Math.random() * (493 + -1) + 1);
    let random: string = randomN.toString();
    return random;
  }
  public id:string;
  public uniqueId:string;
  public stats:number[] = [0,0,0,0,0,0];
  public img:string = "";
  public desc:string;
  public moves:string[] = [];
  public selectedMoves:string[] = ["Tackle"];
  public types;
  private prevPkmn = "";
  /*(Rodrigo): seguinte, 19 nao eh 20
    essa funçao de baixo pega o estado ATUAL do obj Pokemon
    que ta na pokemon.service, desmonta ele todo pra arrumar
    as varipublic async refreshaveis na página Poke Edit (tab5);
  */
  public loadPokemon(){
    let Pokemon = this.pokeService.getCurrentPokemon();
    let currentPkmn = Pokemon.uniqueId;
    if(this.prevPkmn != currentPkmn){
      this.moves = [];
      for(let i = 0;i<Pokemon.stats.length;i++){
        this.stats[i] = Pokemon.stats[i];
      }
      //console.log(Pokemon.stats);
      for(let i = 0;i<Pokemon.availableMoves.length;i++){
        
        this.moves[i] = Pokemon.availableMoves[i];
        
      }
      this.uniqueId = Pokemon.uniqueId;
    }
    
    this.desc = Pokemon.description;
    this.setImg(Pokemon.img);
    this.setTypes(Pokemon.types);
    this.id = Pokemon.id;
    console.log(currentPkmn, this.prevPkmn);
    this.prevPkmn = currentPkmn;
  }
  public addPoint(stat:number){
    if(this.stats[stat] == 150){
      return 0;
    }
    let temp = this.stats[stat];
    this.stats[stat] = temp+1;
  }
  public dimPoint(stat:number){
    if(this.stats[stat] == 0){
      return 0;
    }
    let temp = this.stats[stat];
    this.stats[stat] = temp-1;
  }

  public setImg(url:string){
    this.img = url;
  }
  public setTypes(types){
    this.types = types;
  }

  public addToParty(){
    if(this.uniqueId == this.id){
      this.uniqueId = this.id + this.getARandomNum();
    }
    let PokemonToAdd = {
      uniqueId: this.uniqueId,
      id: this.id,
      img: this.img,
      description: this.desc,
      types: this.types,
      availableMoves: this.moves,
      stats: this.stats,
      selectedMoves: this.selectedMoves
    }
  
  }
    
  }
  
