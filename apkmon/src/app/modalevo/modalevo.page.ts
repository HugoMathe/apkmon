import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';
@Component({
  selector: 'app-modalevo',
  templateUrl: './modalevo.page.html',
  styleUrls: ['./modalevo.page.scss'],
})

export class ModalevoPage implements OnInit {
  public resultados;
  private imgSrc: string = "https://pngimage.net/wp-content/uploads/2018/06/glass-png-transparent-3.png";
  public types:string[] = [""];
  public hideMe:boolean = false;
  public hideMe1:boolean = false;
  public hideMe2:boolean = false;


  constructor(private modalController:ModalController,private pokeService: PokemonService) { }
  ngOnInit() {
    this.refresh();
   
  }
 


  public async loadPokemon(id: string) {
    this.types = [];
    let Pokemon = await this.pokeService.getPokemon('1');  
    this.imgSrc = Pokemon.img;
    console.log(Pokemon.types);
    console.log(this.types);
    for(let i = 0; i < Pokemon.types.length;i++)
      this.types[i] = Pokemon.types[i];
  }


 
  public Pokemon;

  public async setPokemon(){
    this.Pokemon = await this.pokeService.getCurrentPokemon();
  }
  public refresh(){
    setInterval(()=> this.setPokemon(), 5000);
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
}
