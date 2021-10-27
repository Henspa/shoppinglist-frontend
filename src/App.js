import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('type description');
  const [amount, setAmount] = useState('type amount');

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      //console.log(response.data);
      setItems(response.data);
      setItem(response.data);
      setAmount(response.data);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }, [])

  function add(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item})
    axios.post(URL + 'save.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
        setItems(items => [...items,response.data]);
        setItem('');
        setAmount('');
      }).catch (error => {
        alert(error.response.data.error)
      });
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = items.filter((task) => task.id !== id);
      setItems(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

  return (
    <div className="container">
      <h3>Shopping List</h3>
      <form onSubmit={add}>
        <label>New item</label>
        <input value={item} onChange={e => setItem(e.target.value)} />
        <input value={amount} onChange={e => setAmount(e.target.value)} />
        <button>Add</button>
      </form>
      <ol>
        {items?.map(item => (
          <li key={item.id}>
            {item.description && item.amount}&nbsp;
            <a className="delete" onClick={() => remove(item.id)} href="#">
              Delete
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
