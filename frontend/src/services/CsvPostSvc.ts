import axios from 'axios';

const CsvPostSvc = async () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'content-type': 'application/json;',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm5hbWUiOiJBZG1pbiIsImV4cCI6MTY4NTUwNjAxMn0.pPN-pIr7pV9zsm75qnn3rmAuRN28vgnr6VOjJ9EeBlU'
    },
  });

  // Make a GET request
  instance.get('/users')
    .then(response => {
      // Handle the response data
      console.log(response.data);
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });

}


export default CsvPostSvc;