import React, { Component } from 'react';
import Header from './Header';
import {browserHistory} from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.location.state.selected,
      people: this.props.location.state.people ,
      planets: this.props.location.state.planets,
      peopleStore: this.props.location.state.peopleStore,
      comment: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({comment: event.target.value});
  }

  componentWillMount() {
    this.props.location.state.peopleStore.subscribe(() => {
      this.setState({ people : this.props.location.state.peopleStore.getState() });
    });
  }

  getPlanetName() {
    return this.state.planets.find((planet) => {
        return planet.url === this.state.people[this.state.selected].homeworld;
      }).name;
  }

  upVote(selected) {
    this.state.peopleStore.dispatch({type:'UP_VOTE', selected});
  }

  downVote(selected) {
    this.state.peopleStore.dispatch({type:'DOWN_VOTE', selected});
  }

  postComment(selected) {
    const comment = this.state.comment;
    this.state.peopleStore.dispatch({type:'POST_COMMENT', selected, comment});
    this.state.comment = '';
  }

  goHome() {
    browserHistory.push({
      pathname: '/'
    });
  }

  getRate() {
    const up = this.state.people[this.state.selected].upvote;
    const down = this.state.people[this.state.selected].downvote;

    if(up === 0) {
      return 0;
    } else {
      return Math.trunc((up / (up + down)) * 100);
    }
  }

  render(){
    if("undefined" === typeof this.state.people) return null;

      return (
        <div className="Details">
          <Header title={this.state.people[this.state.selected].name}></Header>

          <Grid fluid>
            <Row>
              <Col xs={12} md={8}>
                <div className="details-box">
                  <table className="Details-character-table">
                    <tbody>
                      <tr>
                        <td>Height</td>
                        <td>{this.state.people[this.state.selected].height}</td>
                      </tr>

                      <tr>
                        <td>Mass</td>
                        <td>{this.state.people[this.state.selected].mass}</td>
                      </tr>

                      <tr>
                        <td>Hair Color</td>
                        <td>{this.state.people[this.state.selected].hair_color}</td>
                      </tr>

                      <tr>
                        <td>Skin Color</td>
                        <td>{this.state.people[this.state.selected].skin_color}</td>
                      </tr>

                      <tr>
                        <td>Eye Color</td>
                        <td>{this.state.people[this.state.selected].eye_color}</td>
                      </tr>

                      <tr>
                        <td>Birth Year</td>
                        <td>{this.state.people[this.state.selected].birth_year}</td>
                      </tr>

                      <tr>
                        <td>Gender</td>
                        <td>{this.state.people[this.state.selected].gender}</td>
                      </tr>

                      <tr>
                        <td>Planet</td>
                        <td>{this.getPlanetName()}</td>
                      </tr>

                      <tr>
                        <td>Rate</td>
                        <td>{this.getRate()} %</td>
                      </tr>

                      <tr>
                        <td>Comments</td>
                        <td>{this.state.people[this.state.selected].comments.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="details-footer">
                    <button onClick={()=>this.upVote(this.state.selected)}>Upvote</button>
                    <button onClick={()=>this.downVote(this.state.selected)}>Downvote</button>
                    <button className="left" onClick={()=>this.goHome()}>Back</button>
                  </div>
                </div>
              </Col>

              <Col xs={12} md={4}>
                <div className="details-box">
                  <textarea name="comment" className="comment-box" value={this.state.comment} onChange={this.handleChange}/>
                  <button onClick={()=>this.postComment(this.state.selected)}>Post Comment</button>
                </div>

                <div className="details-box">
                  {this.state.people[this.state.selected].comments.map((comment, index) =>
                    <div key={index} className="blockquote">
                      <p>{comment}</p>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
}
