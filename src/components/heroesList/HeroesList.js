import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteHeroAction, fetchHeroes, filteredHeroesSelector } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {deleteH} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    // const deleteHero = (id) => {
    //     dispatch ({type:'HEROES_FETCHED', payload: heroes.filter(item => item.id !== id)});
    // }
 

    const deleteHero = (id) => {
        deleteH(`http://localhost:3001/heroes/${id}`)
            .then (data => console.log(data, "DELETE"))
            .then(dispatch(deleteHeroAction(id)))
            .catch(error => console.log(error))
    } 


    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem 
                    key={id} 
                    {...props} 
                    onDelete={() => deleteHero(id)}/>
        })
    }

    

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList; 