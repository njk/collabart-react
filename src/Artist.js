import React, { Component } from 'react'
import client from './config/feathers'
import {
	Switch, 
	Route,
	Link
	} from 'react-router-dom'
import Works from './Works'

export default class Artist extends Component {
	
	state = {
		artist: {}
	};

	componentDidMount(){
		const { match } = this.props;
		this.fetchArtist(match.params.artistId);
	}

	componentWillUnmount(){
	}

	fetchArtist = (artistId) => {
		console.log(typeof artistId)
		client.service('artists')
			.get(artistId)
			.then(res => {
					console.log(res)
					this.setState({artist: res})
					}
				);
	}	

	render() {	
		const { match } = this.props;
		let name;
		if(this.state.artist && this.state.artist.name) {
			name = this.state.artist.name.first + " " + this.state.artist.name.last;
		}
		return (
			<div class="artist">
				<h2>{name}</h2>
				<ul>
			        <li>
			          <Link to={`${match.url}/works`}>Portfolio</Link>
			        </li>
			        <li>
			          <Link to={`${match.url}/vita`}>
			            Vita
			          </Link>
			        </li>
			      </ul>

			      {/* The Topics page has its own <Switch> with more routes
			          that build on the /topics URL path. You can think of the
			          2nd <Route> here as an "index" page for all topics, or
			          the page that is shown when no topic is selected */}
			      <Switch>
			        <Route path={`${match.path}/works`} component={Works}>
			        </Route>
			        <Route path={match.path}>
      					<div dangerouslySetInnerHTML={{ __html: this.state.artist.vita }} />
			        </Route>
			      </Switch>
			</div>
			)
	};
}