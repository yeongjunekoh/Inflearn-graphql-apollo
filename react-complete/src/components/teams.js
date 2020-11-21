import './components.css';
import { useQuery, gql } from '@apollo/client';

const GET_TEAMS = gql`
  query GetTeams {
    teams {
        id,
        manager,
        members {
          last_name,
          role,
          tools {
            id
          }
        }
      }
  }
`;


function Teams() {

    function InsertAsideElements () {
        const { loading, error, data } = useQuery(GET_TEAMS);

        console.log(error)

        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>

        console.log(data)

        return (<div></div>);
    }

    function InsertContentsElements () {
        return (<div></div>);
    }

    return (
        <div id="teams" className="component">
            <aside>
                {InsertAsideElements()}
            </aside>
            <section className="contents">
                {InsertContentsElements()}
            </section>
        </div>
    )
}

export default Teams;