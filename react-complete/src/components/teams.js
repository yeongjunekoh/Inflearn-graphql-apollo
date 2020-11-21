import './components.css';
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

  function AsideItems () {
    const { loading, error, data } = useQuery(GET_TEAMS);
    const roleIcons = {
      developer: '💻',
      designer: '🎨',
      planner: '📝'
    }

    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>

    return (
      <ul>
        {data.teams.map(({id, manager, members}) => {
          return (
            <li key={id}>
              <span className="teamItemTitle">Team {id} : {manager}'s</span>
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
    return (<div></div>);
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