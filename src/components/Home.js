import React, {Component} from "react";
import {Link} from "react-router-dom";

const PER_PAGE = 10000;

class Home extends Component {
  state = {
    pokemon: [],
    loaded: false,
    searchTerm: "",
    types: []
  }
  componentDidMount(){

    this.getPokemon();
    this.getTypes();
  }

  componentDidUpdate(oldProps){
    if(oldProps.location.search !== this.props.location.search){
      this.setState({
        loaded: false,
        pokemon: []
      })
      this.getPokemon();
    }
  }
  getType(){
    const params = new URLSearchParams(this.props.location.search);
    let type = "";
    if(params.has("type")){
      type = params.get("type");
    }

    return type;
  }
  async getTypes(){
    const req = await fetch("https://pokeapi.co/api/v2/type");
    const data = await req.json();
    this.setState({
      types: data.results
    });
  }
  async getPokemon(){
    const type = this.getType();
    let endpoint = "https://pokeapi.co/api/v2/pokemon";
    let map = (data) => {return data.results};
    if(type){
      endpoint = `https://pokeapi.co/api/v2/type/${type}`
      map = (data) => {
        return data.pokemon.map((p)=>{
          return p.pokemon
        })
      }
    }
    const req = await fetch(`${endpoint}?&limit=${PER_PAGE}}`);

    if(req.ok){
      const data = await req.json();
      this.setState({
        pokemon: map(data),
        loaded: true
      })
    }
  }
  updateSearch = (e) =>{
    this.setState({
      searchTerm: e.target.value
    })
  }
  setType = (e) => {
    const query = new URLSearchParams(this.props.location.search);

    query.set("type", e.target.value);

    this.props.history.push({
      search: `?${query.toString()}`
    })
  }
  filterPoke(){
    const term = this.state.searchTerm.toLowerCase();
    if(!term){
      return this.state.pokemon;
    }

    return this.state.pokemon.filter((poke)=>{
      return poke.name.toLowerCase().indexOf(term) > -1;
    })
  }
  render(){
    const currentType = this.getType()
    return (
      <div className="container">
        <h1>POKEMON</h1>
        {!this.state.loaded && <span>loading...</span>}
        <div>
          <div>
          <input value={this.state.searchTerm} onChange={this.updateSearch} placeholder="Filter By Name"/>
        </div>
        <details>
          <summary>Filter Type <Link to="/">Clear</Link></summary>
          {this.state.types.map((type)=>{
            return (
              <label className="mr-2">
                <input type="radio" name="type" value={type.name} onChange={this.setType} checked={currentType === type.name}/>
                {type.name}
              </label>
              )
            })}
        </details>

        </div>
        <div>
          <ul className="list-group-flush">
            {this.filterPoke().map((poke)=>{
              return (
                <li className="list-group-item" key={poke.name}>
                  <Link to={`/pokemon/${poke.name}`}>{poke.name}</Link>
                  </li>
                  )
              })}
          </ul>
        </div>
        </div>
        )
  }
}

export default Home;