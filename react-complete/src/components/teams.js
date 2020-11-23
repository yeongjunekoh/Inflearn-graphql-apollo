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

function Teams() {



  const [contentId, setContentId] = useState('1')

  function callSetContentId(id) {
    setContentId(id)
  }


  function AsideItems (data) {
    const roleIcons = {
      developer: '💻',
      designer: '🎨',
      planner: '📝'
    }

    return (
      <ul>
        {data.teams.map(({id, manager, members}) => {
          return (
            <li key={id}>
              <span className="teamItemTitle" onClick={() => {callSetContentId(id)}}>
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

  function MainContents (data) {
    return (
      <div>
        {data.teams.map(({id, manager}) => {
          return (
            <div className="inputContainer">
              <table>
                <tr>
                  <td>Manager</td>
                  <td><input type="text"/></td>
                </tr>
                <tr>
                  <td>Office</td>
                  <td><input type="text"/></td>
                </tr>
                <tr>
                  <td>Extension Number</td>
                  <td><input type="text"/></td>
                </tr>
                <tr>
                  <td>Mascot</td>
                  <td><input type="text"/></td>
                </tr>
                <tr>
                  <td>Cleaning Duty</td>
                  <td><input type="text"/></td>
                </tr>
                <tr>
                  <td>Project</td>
                  <td><input type="text"/></td>
                </tr>
              </table>

            </div>
          )
        })}
      </div>
    )
  }

  const { loading, error, data } = useQuery(GET_TEAMS);

  if (loading) return <p className="loading">Loading...</p>
  if (error) return <p className="error">Error :(</p>

  return (
    <div id="teams" className="component">
        <aside>
            {AsideItems(data)}
        </aside>
        <section className="contents">
            {MainContents(data)}
        </section>
    </div>
  )
}

export default Teams;