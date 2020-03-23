import React, { Component } from 'react'
import client from './config/feathers'

export default class Works extends Component {
	
	state = {
		works: []
	};

	componentDidMount(){
		const { match } = this.props;
		this.fetchWorks(match.params.artistId);
	}

	componentWillUnmount(){
	}

	fetchWorks = (artistId) => {
		client.service('works')
			.find({query: 
				{
					artists: artistId,
					isPublic: true,
					$sort: {
							publishedDate: -1
						}
				}})
			.then(res => {
					this.setState({works: res.data})
					}
				);
	}	

	render() {	
		const { match } = this.props;
		return (
			<div class="works">
				{this.state.works.map(work => {
					return <div key={work._id}>
						<img class="work-image" src={work.image.s3_url || work.image.secure_url} width="800px"/>
						<p>{work.title}, {work.dimensions ? work.dimensions.height+"x"+work.dimensions.width+"cm" : ""}</p>
						</div>
				})
				}
			</div>
			)
	};
}