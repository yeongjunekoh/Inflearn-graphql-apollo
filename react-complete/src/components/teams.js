import './components.css';
import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TEAMS = gql`
  query GetTeams {
    teams {
        id,
        manager,
        members {
          id,
          first_name,
          last_name,
          role,
        }
      }
  }
`;

const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
        id,
        manager,
        office,
        extension_number,
        mascot,
        cleaning_duty,
        project
      }
  }
`;

const DELETE_TEAM = gql`
  mutation DeleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      id
    }
  }
`

const POST_TEAM = gql`
  mutation PostTeam($input: PostTeamInput!) {
    postTeam(input: $input) {
      id,
      manager,
      office,
      extension_number,
      mascot,
      cleaning_duty,
      project
    }
  }
`

const EDIT_TEAM = gql`
  mutation EditTeam($id: ID!, $input: PostTeamInput!) {
    editTeam(id: $id, input: $input) {
      id,
      manager,
      office,
      extension_number,
      mascot,
      cleaning_duty,
      project
    }
  }
`

let refetchTeams = () => {}

function Teams() {

  const [contentId, setContentId] = useState(0)

  const [manager, setManager] = useState('')
  const [office, setOffice] = useState('')
  const [extension_number, setExtensionNumber] = useState('')
  const [mascot, setMascot] = useState('')
  const [cleaning_duty, setCleaningDuty] = useState('')
  const [project, setProject] = useState('')

  const [postTeam, { postTeamData }] = useMutation(
    POST_TEAM, { onCompleted: postTeamCompleted }); 
  const [editTeam, { editTeamData }] = useMutation(
    EDIT_TEAM, { onCompleted: editTeamCompleted }); 
  const [deleteTeam, { deleteTeamData }] = useMutation(
    DELETE_TEAM, { onCompleted: deleteTeamCompleted }); 

  function execPostTeam () {
    postTeam({
      variables: {
        input: {
          manager, office, extension_number, mascot, cleaning_duty, project
        }}})
  }
  function postTeamCompleted (data) {
    alert(`${data.postTeam.id} 항목이 생성되었습니다.`)
    refetchTeams()
    setContentId(0)
  }

  function execEditTeam () {
    editTeam({
      variables: {
        id: contentId,
        input: {
          manager, office, extension_number, mascot, cleaning_duty, project
        }}})
  }
  function editTeamCompleted (data) {
    alert(`${data.editTeam.id} 항목이 수정되었습니다.`)
    refetchTeams()
  }

  function execDeleteTeam () {
    if (window.confirm('이 항목을 삭제하시겠습니까?')) {
      deleteTeam({variables: {id: contentId}})
    }
  }
  function deleteTeamCompleted (data) {
    alert(`${data.deleteTeam.id} 항목이 삭제되었습니다.`)
    refetchTeams()
    setContentId(0)
  }

  function AsideItems () {

    const roleIcons = {
      developer: '💻',
      designer: '🎨',
      planner: '📝'
    }

    const { loading, error, data, refetch } = useQuery(GET_TEAMS);

    refetchTeams = refetch

    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>

    return (
      <ul>
        {data.teams.map(({id, manager, members}) => {
          return (
            <li key={id}>
              <span className="teamItemTitle" onClick={() => {setContentId(id)}}>
                Team {id} : {manager}'s
              </span>
              <ul className="teamMembers">
                {members.map(({id, first_name, last_name, role}) => {
                  return (
                    <li key={id}>
                      {roleIcons[role]} {first_name} {last_name}
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }

  function MainContents () {

    const { loading, error } = useQuery(GET_TEAM, {
      variables: {id: contentId},
      onCompleted: (data) => {
        if (contentId === 0) {
          setManager('')
          setOffice('')
          setExtensionNumber('')
          setMascot('')
          setCleaningDuty('')
          setProject('')
        } else {
          setManager(data.team.manager)
          setOffice(data.team.office)
          setExtensionNumber(data.team.extension_number)
          setMascot(data.team.mascot)
          setCleaningDuty(data.team.cleaning_duty)
          setProject(data.team.project)
        }
      }
    });

    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>

    function handleChange(e, key) {
      const setters = {
        manager: setManager,
        office: setOffice,
        extension_number: setExtensionNumber,
        mascot: setMascot,
        cleaning_duty: setCleaningDuty,
        project: setProject
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
              <td>Manager</td>
              <td>
                <input type="text" value={manager} onChange={(e) => {handleChange(e, 'manager')}}/>
              </td>
            </tr>
            <tr>
              <td>Office</td>
              <td>
                <input type="text" value={office} onChange={(e) => {handleChange(e, 'office')}}/>
              </td>
            </tr>
            <tr>
              <td>Extension Number</td>
              <td>
                <input type="text" value={extension_number} onChange={(e) => {handleChange(e, 'extension_number')}}/>
              </td>
            </tr>
            <tr>
              <td>Mascot</td>
              <td>
                <input type="text" value={mascot} onChange={(e) => {handleChange(e, 'mascot')}}/>
              </td>
            </tr>
            <tr>
              <td>Cleaning Duty</td>
              <td>
                <input type="text" value={cleaning_duty} onChange={(e) => {handleChange(e, 'cleaning_duty')}}/>
              </td>
            </tr>
            <tr>
              <td>Project</td>
              <td>
                <input type="text" value={project} onChange={(e) => {handleChange(e, 'project')}}/>
              </td>
            </tr>
          </tbody>
        </table>
        {contentId === 0 ? (
          <div className="buttons">
            <button onClick={() => {execPostTeam()}}>Submit</button>
          </div>
          ) : (
          <div className="buttons">
            <button onClick={() => {execEditTeam()}}>Modify</button>
            <button onClick={() => {execDeleteTeam()}}>Delete</button>
            <button onClick={() => {setContentId(0)}}>New</button>
          </div>
          )}
      </div>
    )
  }

  return (
    <div id="teams" className="component">
        <aside>
            {AsideItems()}
        </aside>
        <section className="contents">
            {MainContents()}
        </section>
    </div>
  )
}

export default Teams;