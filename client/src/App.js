import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./queries/user";
import {CREATE_USER} from "./mutations/user";

function App() {
  const { data, loading, refetch } = useQuery(GET_ALL_USERS)
  const { data: oneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age: Number(age)
        }
      }
    }).then(({data}) => {
      setUsername('')
      setAge(0)
    })
  }

  const getAllUsers = (e) => {
    e.preventDefault()
    refetch()
  }

  if (loading) {
    return <h1>Loading ...</h1>
  }

  console.log(oneUser)

  return (
    <div className="App">
      <form>
        <label>
          <input
            type={'text'}
            placeholder={'Username'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <input
            type={'number'}
            placeholder={'Age'}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <div>
          <button onClick={addUser}>Create</button>
          <button onClick={getAllUsers}>Pull users from server</button>
        </div>
      </form>
      <div>
        {users.map(user => {
          return (
            <div key={user.id}>
              {user.username} - {user.age}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
