import './components.css';

function Softwares() {

    function AsideItems () {
        return (<div></div>);
    }

    function MainContents () {
        return (<div></div>);
    }

    return (
        <div id="softwares" className="component">
            <aside>
                {AsideItems()}
            </aside>
            <section className="contents">
                {MainContents()}
            </section>
        </div>
    )
}

export default Softwares;