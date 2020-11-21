import './components.css';

function Members() {

    function insertAsideElements () {
        return (<div></div>);
    }

    function insertContentsElements () {
        return (<div></div>);
    }

    return (
        <div id="members" className="component">
            <aside>
                {insertAsideElements()}
            </aside>
            <section className="contents">
                {insertContentsElements()}
            </section>
        </div>
    )
}

export default Members;