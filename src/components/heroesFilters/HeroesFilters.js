
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filtersFetching, filtersFetched, filtersFetchingError } from '../../actions';

const HeroesFilters = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const {filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    const renderFiltersList = (arr) => {
        return arr.map(({id, name, className, element}) => {
            return <button 
                    key={id}
                    className={`${className}${activeFilter === element ? ' active' : ''}`}
                    onClick={() => setActiveFilter(element)}
                    >
                        {name}
                    </button>
        })
    } 

    const elements = renderFiltersList(filters);

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