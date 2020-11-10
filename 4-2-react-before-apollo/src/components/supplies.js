import './components.css';

function Supplies() {

    function insertAsideElements () {
        return (<div></div>);
    }

    function insertContentsElements () {
        return (<div></div>);
    }

    return (
        <div id="supplies" className="component">
            <aside>
                {insertAsideElements()}
            </aside>
            <section className="contents">
                {insertContentsElements()}
            </section>
        </div>
    )
}

export default Supplies;