const apiBASE = '/api';

const heroesAPI = {
    get() {
        return new Promise((resolve, reject) => { // returning a new promise so we know when this executes
            fetch('/api/heroes')
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(error => reject(error)) // error handling within promise
        })
    },
    create(hero) {
        return new Promise((resolve, reject) => {
            fetch(`${apiBASE}/hero`, {
              method: 'POST',
              body: JSON.stringify(hero),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            })
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err => {
              reject(err);
            });
        });
    },
    update(hero) {
        return new Promise((resolve, reject) => {
            fetch(`${apiBASE}/hero`, {
              method: 'PUT',
              body: JSON.stringify(hero),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            })
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        });
    },
    destroy(hero) {
        return new Promise((resolve, reject) => {
          fetch(`${apiBASE}/hero/${hero.id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => {
              reject(err);
            });
        });
    }
}

export default heroesAPI;