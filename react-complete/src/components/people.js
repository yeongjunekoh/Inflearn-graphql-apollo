import './components.css';
import { useState } from 'react';
import { useQuery, userMutation, gql, useMutation } from '@apollo/client';

const GET_PEOPLE = gql`
  query GetPeople {
  people {
    id,
    first_name,
    last_name,
    sex,
    blood_type
    }
  }
`;

const GET_PERSON = gql`
  query GetPeople($id: ID!) {
    team(id: $id) {
      id,
      first_name,
      last_name,
      sex,
      blood_type,
      serve_years,
      role,
      team,
      from
    }
  }
`;

const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id) {
      id
    }
  }
`
const POST_PERSON = gql`
  mutation PostPerson($input: PostPersonInput!) {
    postTeam(input: $input) {
      id,
      first_name,
      last_name,
      sex,
      blood_type,
      serve_years,
      role,
      team,
      from
    }
  }
`

const EDIT_PERSON = gql`
  mutation EditTeam($id: ID!, $input: PostPersonInput!) {
    editTeam(id: $id, input: $input) {
      id,
      first_name,
      last_name,
      sex,
      blood_type,
      serve_years,
      role,
      team,
      from
    }
  }
`

let refetchPeople = () => {}

function People() {
  const [contentId, setContentId] = useState(0)
  
  const bloodTypes = ['A', 'B', 'AB', 'O']
  const roles = ['developer', 'designer', 'planner']

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [sex, setSex] = useState('')
  const [bloodType, setBloodType] = useState(bloodTypes[0])
  const [serveYears, setServeYears] = useState(0)
  const [role, setRole] = useState(roles[0])
  const [team, setTeam] = useState(0)
  const [from, setFrom] = useState('')

  const [postPerson] = useMutation(
    POST_PERSON, { onCompleted: postPersonCompleted })
  const [editPerson] = useMutation(
    EDIT_PERSON, { onCompleted: editPersonCompleted }) 
  const [deletePerson] = useMutation(
    DELETE_PERSON, { onCompleted: deletePersonCompleted }) 

  function execPostPerson () {
    postPerson({
      variables: {
        input: {
          firstName, lastName, sex, bloodType, serveYears, role, team, from
        }}})
  }
  function postPersonCompleted (data) {
    alert(`${data.postPerson.id} 항목이 생성되었습니다.`)
    refetchPeople()
    setContentId(0)
  }

  function execEditPerson () {
    editPerson({
      variables: {
        id: contentId,
        input: {
          firstName, lastName, sex, bloodType, serveYears, role, team, from
        }}})
  }
  function editPersonCompleted (data) {
    alert(`${data.editPerson.id} 항목이 수정되었습니다.`)
    refetchPeople()
  }

  function execDeletePerson () {
    if (window.confirm('이 항목을 삭제하시겠습니까?')) {
      deletePerson({variables: {id: contentId}})
    }
  }
  function deletePersonCompleted (data) {
    alert(`${data.deletePerson.id} 항목이 삭제되었습니다.`)
    refetchPeople()
    setContentId(0)
  }

  function AsideItems () {
    const { loading, error, data, refetch } = useQuery(GET_PEOPLE);

    refetchPeople = refetch

    function peopleFaces(sex) {
      const bySex = {
        male: ['🧑🏿', '👨🏻', '👦🏼', '‍🧓🏽', '🧔🏾'],
        female: ['👩🏻', '👧🏼', '👩🏽‍🦰', '👩🏾‍🦱', '👱🏿‍♀️']
      }
      return bySex[sex][Math.floor(Math.random() * bySex[sex].length)]
    }

    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>

    return (
      <ul>
        {data.people.map(
          ({id, sex, first_name, last_name, blood_type}) => {
            return (
              <li key={id}>
                <span className="face">{peopleFaces(sex)}</span>
                <span className="bloodType">{blood_type}</span>
                <span className="peopleName">{first_name} {last_name}</span>
              </li>
            )
        })}
      </ul>
    );
  }

  function MainContents () {

    const { loading, error } = useQuery(GET_PERSON, {
      variables: {id: contentId},
      onCompleted: (data) => {
        if (contentId === 0) {
          setFirstName('')
          setLastName('')
          setSex('')
          setBloodType(bloodTypes[0])
          setServeYears(0)
          setRole(roles[0])
          setTeam(0)
          setFrom('')
        } else {
          setFirstName('')
          setLastName('')
          setSex('')
          setBloodType(bloodTypes[0])
          setServeYears(0)
          setRole(roles[0])
          setTeam(0)
          setFrom('')
        }
      }
    });

    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>

    function handleChange(e, key) {
      const setters = {
          first_name: setFirstName,
          last_name: setLastName,
          sex: setSex,
          blood_type: setBloodType,
          serve_years: setServeYears,
          role: setRole,
          team: setTeam,
          from: setFrom
      }
      setters[key](e.target.value)
    }

    return (
      <div className="inputContainer">
        <table>
          <tbody>
            {contentId !== 0 && (
            <tr>
              <td>Id</td>
              <td>{contentId}</td>
            </tr>
            )}
            <tr>
              <td>First Name</td>
              <td>
                  <input type="text"/>
              </td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>
                  <input type="text"/>
              </td>
            </tr>
            <tr>
              <td>Sex</td>
              <td>
                  <input type="text"/>
              </td>
            </tr>
            <tr>
              <td>Blood Type</td>
              <td>
                <select>
                  {bloodTypes.map((bloodType) => {
                    return (
                      <option>{bloodType}</option>                    
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Serve Years</td>
              <td>
                  <input type="number"/>
              </td>
            </tr>
            <tr>
              <td>Role</td>
              <td>
                <select>
                  {roles.map((bloodType) => {
                    return (
                      <option>{bloodType}</option>                    
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Team</td>
              <td>
                  <input type="number"/>
              </td>
            </tr>
            <tr>
              <td>From</td>
              <td>
                  <input type="text"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div id="people" className="component">
      <aside>
        {AsideItems()}
      </aside>
      <section className="contents">
        {MainContents()}
      </section>
    </div>
  )
}

export default People;