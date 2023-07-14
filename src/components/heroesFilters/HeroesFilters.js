import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { heroesFetchingError, filtersFetched, heroesFiltered, heroesFetched } from '../../actions';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    let {filters, heroes} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

     useEffect(() => {
            request("http://localhost:3001/filters")
                .then(data => dispatch(filtersFetched(data)))
                .catch(() => dispatch(heroesFetchingError()))
    
            // eslint-disable-next-line
        }, [dispatch, request]);

    //    const handleFilterHeroes = (filter) => {
    //         dispatch(heroesFiltered(filter))
    //         // switch (filter) {
    //         //     case 'fire':
    //         //         return heroes.filter((item) => item.element === filter)
    //         //     case 'water':
    //         //         return heroes.filter((item) => item.element === filter)
    //         //     case 'wind':
    //         //         return heroes.filter((item) => item.element === filter)
    //         //     case 'earth':
    //         //         return heroes.filter((item) => item.element === filter)
    //         //     case 'all':
    //         //         return heroes.map((item) => item)
    //         //     default: 
    //         //         return heroes 
    //         // }
    //     }

    const handleFilterHeroes = (filter) => {
        if (filter === 'all') {
            request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        } else {
          const filteredHeroes = heroes.filter((hero) => hero.element === filter);
        //   console.log(filteredHeroes);
          dispatch(heroesFiltered(filteredHeroes));
        }
      };
    

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map((filter) => {
                        return (
                        <button  className={`btn ${filter.filter === 'all' ? 'btn-outline-dark active' : filter.filter === 'fire' ? 'btn-danger active' : filter.filter === 'water' ? 'btn-primary active' : filter.filter === 'wind' ? 'btn-success active' : 'btn-secondary active'}`} 
                                 key={filter.id}
                                 onClick={() => handleFilterHeroes(filter.filter)}
                                 >{filter.filter}
                                 </button>
                        )
                    })}
                    {/* <button className="btn btn-danger">Fire</button>
                    <button className="btn btn-primary">Whater</button>
                    <button className="btn btn-success">Wind</button>
                    <button className="btn btn-secondary">Earth</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;