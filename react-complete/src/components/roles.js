import './components.css';
import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
    }
  }
`;

const GET_ROLE = gql`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      requirement
      members {
        first_name
        last_name
        serve_years
      }
      equipments {
        id
      }
      softwares {
        id
      }
    }
  }
`;

function Roles() {
  const [contentId, setContentId] = useState('')

  function AsideItems () {
      
    const roleIcons = {
      developer: '💻',
      designer: '🎨',
      planner: '📝'
    }

    const { loading, error, data } = useQuery(GET_ROLES);

    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>

    return (
      <ul>
        {data.roles.map(({id}) => {
          return (
            <li key={id} className={'roleItem ' +  (contentId === 'id' ? 'on' : '')}
            onClick={() => {setContentId(id)}}>
              <span>{contentId === id ? '🔲' : '⬛'}</span>
              {roleIcons[id]} {id}
            </li>
          )
        })}
      </ul>
    );
  }

  function MainContents () {

    const { loading, error, data } = useQuery(GET_ROLE, {
      variables: {id: contentId}
    })

    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>

    if (contentId === '') return (<div className="roleWrapper">Select Role</div>)
    return (
      <div className="roleWrapper">
        <h2>{data.role.id}</h2>
        <div className="requirement"><span>{data.role.requirement}</span> required</div>
      </div>
    );
  }

  return (
    <div id="roles" className="component">
      <aside>
        {AsideItems()}
      </aside>
      <section className="contents">
        {MainContents()}
      </section>
    </div>
  )
}

export default Roles;