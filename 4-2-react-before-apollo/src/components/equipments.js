import './components.css';

function Equipments() {

    function insertAsideElements () {
        return (<div></div>);
    }

    function insertContentsElements () {
        return (<div></div>);
    }

    return (
        <div id="equipments" className="component">
            <aside>
                {insertAsideElements()}
            </aside>
            <section className="contents">
                {insertContentsElements()}
            </section>
        </div>
    )
}

export default Equipments;