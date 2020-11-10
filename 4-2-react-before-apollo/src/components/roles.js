import './components.css';

function Roles() {

    function insertAsideElements () {
        return (<div></div>);
    }

    function insertContentsElements () {
        return (<div></div>);
    }

    return (
        <div id="roles" className="component">
            <aside>
                {insertAsideElements()}
            </aside>
            <section className="contents">
                {insertContentsElements()}
            </section>
        </div>
    )
}

export default Roles;