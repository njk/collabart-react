import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import auth from '@feathersjs/authentication-client'

const client = feathers();

// Connect to a different URL
const restClient = rest(process.env.REACT_APP_BACKEND_URI)

// Configure an AJAX library (see below) with that client 
client.configure(restClient.fetch(window.fetch));
client.configure(auth({
	storageKey: 'auth'
}));

client.authenticate({
      strategy: 'local',
      email: process.env.REACT_APP_EMAIL, 
      password: process.env.REACT_APP_PW
    }).catch(error => this.setState({ error }));

export default client