import './components.css';
import { useQuery, gql } from '@apollo/client';

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

function People() {
    function AsideItems () {
        const { loading, error, data } = useQuery(GET_PEOPLE);
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
        return (<div></div>);
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