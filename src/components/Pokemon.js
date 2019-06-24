import React, {Component} from "react";
import {Link} from "react-router-dom"

class Pokemon extends Component {
  state = {
    pokemon: null,
    loaded: false
  }
  componentDidMount(){
    this.load();
  }
  componentDidUpdate(oldProps){
    if(oldProps.match.params.id !== this.props.match.params.id){
      this.load();
    }
  }
  async load(){
    const id = this.props.match.params.id;
    this.setState({
      loaded: false
    })

    const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if(req.ok){
      const data = await req.json();
      this.setState({
        pokemon: data,
        loaded: true
      })
    }
  }
  render(){
    if(this.state.loaded){
      const pokemon = this.state.pokemon
      console.log(pokemon)
      return (
        <div className="container">
          <h1>{pokemon.name}</h1>
          <div>
            <img alt={pokemon.name} src={pokemon.sprites.front_default} />
          </div>
          <div>
            <h3>Types</h3>
            <ul>
              {
                pokemon.types.map((type)=>{
                  return <li><Link to={`/?type=${type.type.name}`}>{type.type.name}</Link></li>
                })
              }
            </ul>
          </div>
          <details>
            <summary>All Data</summary>
            <pre>
              <code>
                {JSON.stringify(pokemon, null, 2)}
              </code>
            </pre>
          </details>
        </div>
        )
    } else {
      return (
        <div className="container">
          Loading...
        </div>
        )
    }
  }
}

export default Pokemon