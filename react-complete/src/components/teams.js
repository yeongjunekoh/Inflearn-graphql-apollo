import './components.css';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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
        mascot
        cleaning_duty,
        project
      }
  }
`;

function Teams() {

  const [contentId, setContentId] = useState(0)
  const [team, setTeam] = useState({})

  function AsideItems () {

    const roleIcons = {
      developer: '💻',
      designer: '🎨',
      planner: '📝'
    }

    const { loading, error, data } = useQuery(GET_TEAMS);

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
                {members.map(({id, first_name, last_name, role, tools}) => {
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

    const { loading, error, data } = useQuery(GET_TEAM, {
      variables: {id: contentId}
    });

    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>

    let teamObj = {} 
    Object.assign(teamObj, contentId === 0 ? {
        manager: '',
        office: '',
        extension_number: '',
        mascot: '',
        cleaning_duty: '',
        project: ''
    } : data.team)

    Object.assign(team, teamObj)

    console.log('HOHO')

    function handleChange(e, key) {
      teamObj[key] = e.target.value
      // setTeam(teamObj)
      console.log(team)
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
                <input type="text" value={team.manager} onChange={(e) => {handleChange(e, 'manager')}}/>
              </td>
            </tr>
            <tr>
              <td>Office</td>
              <td>
                <input type="text" value={team.office} onChange={(e) => {handleChange(e, 'office')}}/>
              </td>
            </tr>
            <tr>
              <td>Extension Number</td>
              <td>
                <input type="text" value={team.extension_number} onChange={(e) => {handleChange(e, 'extension_number')}}/>
              </td>
            </tr>
            <tr>
              <td>Mascot</td>
              <td>
                <input type="text" value={team.mascot} onChange={(e) => {handleChange(e, 'mascot')}}/>
              </td>
            </tr>
            <tr>
              <td>Cleaning Duty</td>
              <td>
                <input type="text" value={team.cleaning_duty} onChange={(e) => {handleChange(e, 'cleaning_duty')}}/>
              </td>
            </tr>
            <tr>
              <td>Project</td>
              <td>
                <input type="text" value={team.project} onChange={(e) => {handleChange(e, 'project')}}/>
              </td>
            </tr>
          </tbody>
        </table>
        {contentId === 0 ? (
          <div className="buttons">
            <button>Submit</button>
          </div>
          ) : (
          <div className="buttons">
            <button>Modify</button>
            <button>Delete</button>
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