import React, { Component } from 'react';
import './App.css';

interface State{
  csavarok: Csavar[];
  tipusInput: string;
  hosszInput: number;
  arInput: number;
  keszletInput: number;
}

interface Csavar{
  id: number,
  tipus: string,
  hossz: number,
  keszlet: number,
  ar: number,
  rendelesId: number
}

class App extends Component<{}, State>{

  constructor(props: {}){
    super(props);

    this.state = {
      tipusInput: '',
      hosszInput: 0,
      arInput: 0,
      csavarok: [],
      keszletInput: 0,
    }
  }

   async loadCsavarok() {
    let response = await fetch('http://localhost:3000/api/csavar');
    let data = await response.json() as Csavar[];
    this.setState({ 
      csavarok: data, 
    })
  }

  componentDidMount() {
    this.loadCsavarok();
  }

  handleUpload = async () => {
    const { tipusInput, hosszInput, arInput, keszletInput } = this.state;
    if(tipusInput.trim() === '' || hosszInput<1 || arInput <1 || keszletInput<1){
      // this.setState()- tel hibaüzenet megjelenítése
      return;
    }

    const adat = {
      tipus: tipusInput,
      hossz: hosszInput,
      ar: arInput,
      keszlet: keszletInput,
    }

    let response = await fetch('http://localhost:3000/api/csavar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({ 
      tipusInput: '',
      hosszInput: 0,
      arInput: 0,
      keszletInput: 0,
    })

    await this.loadCsavarok();
  };

  render(){

    const { tipusInput, hosszInput, arInput, keszletInput } = this.state;
    return <div>
      <h2>Új Csavar</h2>
    Tipus: <input type="text" value={tipusInput} onChange={e => this.setState({ tipusInput: e.currentTarget.value})} /> <br />
    Hossz: <input type="number" value={hosszInput} onChange={e => this.setState({ hosszInput: parseInt(e.currentTarget.value) })}/> <br />
    Keszlet: <input type="number" value={keszletInput} onChange={e => this.setState({ keszletInput: parseInt(e.currentTarget.value) })}/> <br />
    Ár: <input type="number" value={arInput} onChange={e => this.setState({ arInput: parseInt(e.currentTarget.value) })} /> <br />
    <button onClick={this.handleUpload}>Hozzaad</button> <br />
    <h2>Csavarok:</h2>
    <ul>{
          this.state.csavarok.map(csavar => 
            <li>{csavar.tipus}, {csavar.hossz}cm, {csavar.keszlet}db, {csavar.ar}Ft, </li>
          )
        }</ul>        
    </div>
  }
}

export default App;
