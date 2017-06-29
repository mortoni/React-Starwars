import React, { Component } from 'react';
import Header from './Header';
import {browserHistory} from 'react-router';

export default class Details extends Component {
  constructor(props){
    super(props);
    this.state = {character: this.props.location.state.character , planets : []};
  }

  getPlanetName() {
    return '';
  }

  goHome() {
    browserHistory.push({
      pathname: '/'
    });
  }

  render(){
      return (
        <div className="Details">
          <Header title={this.state.character.name}></Header>
          <div className="content">
            <div className="character-details">

              <table className="Details-character-table">
                <tbody>
                  <tr>
                    <td>Height</td>
                    <td>{this.state.character.height}</td>
                  </tr>

                  <tr>
                    <td>Mass</td>
                    <td>{this.state.character.mass}</td>
                  </tr>

                  <tr>
                    <td>Hair Color</td>
                    <td>{this.state.character.hair_color}</td>
                  </tr>

                  <tr>
                    <td>Skin Color</td>
                    <td>{this.state.character.skin_color}</td>
                  </tr>

                  <tr>
                    <td>Eye Color</td>
                    <td>{this.state.character.eye_color}</td>
                  </tr>

                  <tr>
                    <td>Birth Year</td>
                    <td>{this.state.character.birth_year}</td>
                  </tr>

                  <tr>
                    <td>Gender</td>
                    <td>{this.state.character.gender}</td>
                  </tr>

                  <tr>
                    <td>Planet</td>
                    <td>this.getPlanetName()</td>
                  </tr>

                  <tr>
                    <td>Rate</td>
                    <td>0</td>
                  </tr>

                  <tr>
                    <td>Comments</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="character-comment-box">
              <textarea name="comment" className="comment-box"/>
              <button>Post Comment</button>
              <button>Upvote</button>
              <button>Downvote</button>
              <button className="left" onClick={()=>this.goHome()}>Back</button>
            </div>

          </div>
        </div>
      );
    }
}
