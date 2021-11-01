import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [amounts, setAmounts] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      //console.log(response.data);
      setItems(response.data);
      setAmounts(response.data);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }, [])

  function add(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item, amount:amount})
    axios.post(URL + 'save.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
        setItems(items => [...items, response.data]);
        setItem('');
        setAmounts(amounts => [...amounts, response.data]);
        setAmount('');
      }).catch (error => {
        alert(error.response.data.error)
      });
  }


  return (
    <div className="container">
      <h3>Shopping List</h3>
      <form onSubmit={add}>
        <label>New item</label>
        <input value={item} onChange={e => setItem(e.target.value)}/>&nbsp;
        <input value={amount} onChange={e => setAmount(e.target.value)} />
        <button>Add</button>
      </form>
      <ol>
        {items?.map(item => (
          <li key={item.id}>
            {item.description}&nbsp;
            {item.amount}&nbsp;
            <a href="#" className="delete" onClick={() => remove(item.id)}>
              Delete
            </a>
          </li>
        ))}
      </ol>
    </div>
  );

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
      const newListWithoutRemoved2 = amounts.filter((task2) => task2.id !== id);
      setAmounts(newListWithoutRemoved2);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

}

export default App;
