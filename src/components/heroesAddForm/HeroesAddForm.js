import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetched, heroesFetchingError, addHeroAction, heroCreated } from '../heroesList/heroesSlice';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../hooks/http.hook';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {heroes} = useSelector(state => state.heroes);
    const {filters} = useSelector(state => state.filters);
    const {addH} = useHttp();


      const submit = (e) => {
        e.preventDefault();
    
        const newHero = {
          id: uuidv4(),
          name: e.target.name.value,
          description: e.target.text.value,
          element: e.target.element.value,
        };
        
            addH("http://localhost:3001/heroes", "POST", newHero)
                .then(dispatch(heroCreated(newHero)))
                .catch(() => dispatch(heroesFetchingError()))
    
            e.target.reset();
        }

        // .then(data => dispatch(heroesFetched([...heroes, data])))

        const renderFilters = (filters, status) => {
            if (status === "loading") {
                return <option>Загрузка элементов</option>
            } else if (status === "error") {
                return <option>Ошибка загрузки</option>
            }
            
           
            if (filters && filters.length > 0 ) {
                return filters.map(({id, filter}) => {
                    
                    // eslint-disable-next-line
                    if (filter === 'all')  return;
    
                    return <option key={id} value={filter}>{filter}</option>
                })
            }
        }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={submit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text"
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    {renderFilters(filters)}
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button type="submit" 
                    className="btn btn-primary"
                    >Создать</button>
        </form>
    )
}

export default HeroesAddForm;