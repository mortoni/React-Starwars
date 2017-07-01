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
    try {
      this.props.location.state.peopleStore.subscribe(() => {
        this.setState({ people : this.props.location.state.peopleStore.getState() });
      });
    } catch (e) {
      this.goHome();
    }
  }

  getPlanetName() {
    return this.state.planets.find((planet) => {
        return planet.url === this.state.people[this.getIndex()].homeworld;
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
    this.setState({ comment : '' });
  }

  goHome() {
    browserHistory.push({
      pathname: '/'
    });
  }

  getIndex() {
    return this.state.people.findIndex((p) => {
      return p.name === this.state.selected.name;
    });
  }

  getRate() {
    const up = this.state.people[this.getIndex()].upvote;
    const down = this.state.people[this.getIndex()].downvote;

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
          <Header title={this.state.people[this.getIndex()].name}></Header>

          <Grid fluid>
            <Row>
              <Col xs={12} md={8}>
                <div className="Character-box">
                  <table className="Character-table">
                    <tbody>
                      <tr>
                        <td>Height</td>
                        <td>{this.state.people[this.getIndex()].height}</td>
                      </tr>

                      <tr>
                        <td>Mass</td>
                        <td>{this.state.people[this.getIndex()].mass}</td>
                      </tr>

                      <tr>
                        <td>Hair Color</td>
                        <td>{this.state.people[this.getIndex()].hair_color}</td>
                      </tr>

                      <tr>
                        <td>Skin Color</td>
                        <td>{this.state.people[this.getIndex()].skin_color}</td>
                      </tr>

                      <tr>
                        <td>Eye Color</td>
                        <td>{this.state.people[this.getIndex()].eye_color}</td>
                      </tr>

                      <tr>
                        <td>Birth Year</td>
                        <td>{this.state.people[this.getIndex()].birth_year}</td>
                      </tr>

                      <tr>
                        <td>Gender</td>
                        <td>{this.state.people[this.getIndex()].gender}</td>
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
                        <td>{this.state.people[this.getIndex()].comments.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="Character-footer">
                    <button onClick={()=>this.upVote(this.getIndex())}>Upvote</button>
                    <button onClick={()=>this.downVote(this.getIndex())}>Downvote</button>
                    <button className="left" onClick={()=>this.goHome()}>Back</button>
                  </div>
                </div>
              </Col>

              <Col xs={12} md={4}>
                <div className="Character-box">
                  <textarea name="comment" className="comment-box" value={this.state.comment} onChange={this.handleChange}/>
                  <button onClick={()=>this.postComment(this.getIndex())}>Post Comment</button>
                </div>

                <div className="Character-box">
                  {this.state.people[this.getIndex()].comments.map((comment, index) =>
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
