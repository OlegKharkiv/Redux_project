import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';



const MainPage = () => {
    return (
                <div className="content">
                    <HeroesList/>
                    <div className="content__interactive">
                        <HeroesAddForm/>
                        <HeroesFilters/>
                    </div>
                </div>
    )
}

export default MainPage;