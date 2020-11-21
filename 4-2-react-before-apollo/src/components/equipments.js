import './components.css';

function Equipments() {

    function AsideItems () {
        return (<div></div>);
    }

    function MainContents () {
        return (<div></div>);
    }

    return (
        <div id="equipments" className="component">
            <aside>
                {AsideItems()}
            </aside>
            <section className="contents">
                {MainContents()}
            </section>
        </div>
    )
}

export default Equipments;