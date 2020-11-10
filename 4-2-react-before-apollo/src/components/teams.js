import './components.css';

function Teams() {

    function insertAsideElements () {
        return (<div></div>);
    }

    function insertContentsElements () {
        return (<div></div>);
    }

    return (
        <div id="teams" className="component">
            <aside>
                {insertAsideElements()}
            </aside>
            <section className="contents">
                {insertContentsElements()}
            </section>
        </div>
    )
}

export default Teams;