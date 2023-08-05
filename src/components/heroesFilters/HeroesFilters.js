import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

     useEffect(() => {
            dispatch(filtersFetching());
            request("http://localhost:3001/filters")
                .then(data => dispatch(filtersFetched(data)))
                .catch(() => dispatch(filtersFetchingError()))
    
            // eslint-disable-next-line
        }, []);


//     const handleFilterHeroes = (filter) => {
//         if (filter === 'all') {
//             request("http://localhost:3001/heroes")
//             .then(data => dispatch(heroesFetched(data)))
//             .catch(() => dispatch(heroesFetchingError()))
//         } else {
//           const filteredHeroes = heroes.filter((hero) => hero.element === filter);
//         //   console.log(filteredHeroes);
//           dispatch(heroesFiltered(filteredHeroes));
//         }
//       };
    

//     return (
//         <div className="card shadow-lg mt-4">
//             <div className="card-body">
//                 <p className="card-text">Отфильтруйте героев по элементам</p>
//                 <div className="btn-group">
//                     {filters.map((filter) => {
//                         return (
//                         <button  className={`btn ${filter.filter === 'all' ? 'btn-outline-dark active' : filter.filter === 'fire' ? 'btn-danger active' : filter.filter === 'water' ? 'btn-primary active' : filter.filter === 'wind' ? 'btn-success active' : 'btn-secondary active'}`} 
//                                  key={filter.id}
//                                  onClick={() => handleFilterHeroes(filter.filter)}
//                                  >{filter.filter}
//                                  </button>
//                         )
//                     })}
//                     {/* <button className="btn btn-danger">Fire</button>
//                     <button className="btn btn-primary">Whater</button>
//                     <button className="btn btn-success">Wind</button>
//                     <button className="btn btn-secondary">Earth</button> */}
//                 </div>
//             </div>
//         </div>
//     )
// }

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({id, filter, className, label}) => {

            const btnClass = classNames('btn', className, {
                'active': filter === activeFilter
            });
            
            return <button 
                        key={id} 
                        id={filter} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(filter))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
    }

export default HeroesFilters;