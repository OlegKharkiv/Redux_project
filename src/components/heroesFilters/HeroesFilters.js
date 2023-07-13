import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { heroesFetchingError, filtersFetched } from '../../actions';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    let {filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

     useEffect(() => {
            request("http://localhost:3001/filters")
                .then(data => dispatch(filtersFetched(data)))
                .catch(() => dispatch(heroesFetchingError()))
    
            // eslint-disable-next-line
        }, [dispatch, request]);

    
    

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map((filter) => {
                        return (
                        <button  className={`btn ${filter.filter === 'all' ? 'btn-outline-dark active' : filter.filter === 'fire' ? 'btn-danger' : filter.filter === 'water' ? 'btn-primary' : filter.filter === 'wind' ? 'btn-success' : 'btn-secondary'}`} 
                                key={filter.id}>{filter.filter}</button>
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