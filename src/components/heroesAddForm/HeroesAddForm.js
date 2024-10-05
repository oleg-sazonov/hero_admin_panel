import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroAdded } from '../heroesList/heroesSlice';

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const { postRequest } = useHttp();

    const onSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        };

        postRequest("http://localhost:3001/heroes", newHero)
            .then(res => console.log(res, 'Post success'))
            .then(dispatch(heroAdded(newHero)))
            .catch(err => {
                console.error("Failed to add hero", err);
            });

        setName('');
        setDescription('');
        setElement('');
    };

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({name, element}) => {
                // eslint-disable-next-line
                if (element === 'all')  return;

                return <option key={element} value={element}>{name}</option>
            })
        }
    }

    return (
        <form 
            className="border p-4 shadow-lg rounded"
            onSubmit={onSubmit}> 
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={name}
                    placeholder="Как меня зовут?"
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    value={description}
                    style={{"height": '130px'}}
                    onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    name="element"
                    className="form-select" 
                    id="element" 
                    value={element} 
                    onChange={(e) => setElement(e.target.value)}
                    >
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;