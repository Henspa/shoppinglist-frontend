import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/index.php';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      console.log(response.data);
      setItems(response.data);
    }).catch(error => {
      alert(error);
    })
  }, [])


  return (
    <ol>
      {items?.map(item => (
        <li key={item.id}>{item.description}</li>
      ))}
    </ol>
  );
}

export default App;
