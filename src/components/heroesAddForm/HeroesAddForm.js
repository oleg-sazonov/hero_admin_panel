

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroAdded } from '../../actions';

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');
    const dispatch = useDispatch();
    const { postRequest } = useHttp();
    // const filters = useSelector(state => state.filters);

    const onSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        };

        postRequest("http://localhost:3001/heroes", newHero)
            .then(data => {
                dispatch(heroAdded(data));
            })
            .catch(err => {
                console.error("Failed to add hero", err);
            });

        setName('');
        setDescription('');
        setElement('');
    };

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
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;