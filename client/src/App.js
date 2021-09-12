import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";


const App = () => {
    const [rout, setRout] = useState([]);
    const [staticRout, setStaticRout] = useState([])
    const [sortName, setSortName] = useState(false);
    const [sortQuality, setSortQuality] = useState(false);
    const [sortDistant, setSortDistant] = useState(false);
    const [col, setCol] = useState("0");
    const [condition, setCondition] = useState("0");
    const [filterValue, setFilterValue] = useState('');
    const [visibleFilter, setVisibleFilter] = useState(false);
    const [currentPage, setCorrentPage] = useState(1)
    //максимальное кол элеменотов на странице
    const [routPerPage, setPerPage] = useState(3);

    useEffect(() => {
        
        getRout();
    }, []);

    const getRout = () => {
        axios
            .get("http://localhost:8081/api/rout")
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                setRout(() => [...data]);
                setStaticRout(() => [...data]);
            });
    };

    const lastRoutIndex = currentPage * routPerPage;
    const firstRoutIndex = lastRoutIndex - routPerPage;
    // текущая страница
    const currentRout = rout.slice(firstRoutIndex, lastRoutIndex) 
    // переключение между списком елементов
    const paginate = pagenumber => setCorrentPage(pagenumber)
    
    const sortNameRout = () => {
        if (sortName) {
            setRout(() =>
                rout.sort(function (obj1, obj2) {
                    if (obj1.name < obj2.name) return -1;
                    if (obj1.name > obj2.name) return 1;
                    return 0;
                })
            );
            setSortName(false);
        } else {
            setRout(() =>
                rout.sort(function (obj1, obj2) {
                    if (obj2.name < obj1.name) return -1;
                    if (obj2.name > obj1.name) return 1;
                    return 0;
                })
            );
            setSortName(true);
        }
    };
    const sortQualityRout = () => {
        if (sortQuality) {
            setRout(() =>
                rout.sort(function (obj1, obj2) {
                    if (obj1.quality < obj2.quality) return -1;
                    if (obj1.quality > obj2.quality) return 1;
                    return 0;
                })
            );
            setSortQuality(false);
        } else {
            setRout(() =>
                rout.sort(function (obj1, obj2) {
                    if (obj2.quality < obj1.quality) return -1;
                    if (obj2.quality > obj1.quality) return 1;
                    return 0;
                })
            );
            setSortQuality(true);
        }
    };
    const sortDistantRout = () => {
        if (sortDistant) {
            setRout(() =>
                rout.sort(function (obj1, obj2) {
                    if (obj1.distant < obj2.distant) return -1;
                    if (obj1.distant > obj2.distant) return 1;
                    return 0;
                })
            );
            setSortDistant(false);
        } else {
            setRout(() =>
                rout.sort(function (obj1, obj2) {
                    if (obj2.distant < obj1.distant) return -1;
                    if (obj2.distant > obj1.distant) return 1;
                    return 0;
                })
            );
            setSortDistant(true);
        }
    };
    const applyFilter = () => {
        resetFilter()
        switch (col) {
            case "0":
                switch (condition) {
                    case "0":
                        setRout(rout.filter((el) => el.name === filterValue))
                        break;
                    case "1":
                        setRout(rout.filter((el) => el.name.includes(filterValue)))
                        break;
                    case "2":
                        
                        break;
                    case "3":
                        
                        break;
                
                    default:
                        break;
                }
                break;
            case "1":
                switch (condition) {
                    case "0":
                        setRout(rout.filter((el) => el.quality === +filterValue))
                        break;
                    case "1":
                        
                        break;
                    case "2":
                        setRout(rout.filter((el) => el.quality > filterValue))
                        break;
                    case "3":
                        setRout(rout.filter((el) => el.quality < filterValue))
                        break;
                
                    default:
                        break;
                }
                break;
            case "2":
                switch (condition) {
                    case "0":
                        setRout(rout.filter((el) => el.distant === +filterValue))
                        break;
                    case "1":
                        
                        break;
                    case "2":
                        setRout(rout.filter((el) => el.distant > filterValue))
                        break;
                    case "3":
                        setRout(rout.filter((el) => el.distant < filterValue))
                        break;
                
                    default:
                        break;
                }
                break;
        
            default:
                break;
        }
    }
    const resetFilter = () => {
        setRout(staticRout)
    }
    
    return (
        <div className="container">
            <div className="col">
                <table className="centered table">
                    <thead> 
                        <tr>
                            <th>Дата</th>
                            <th>
                                Название
                                <i
                                    className="medium material-icons"
                                    onClick={() => sortNameRout()}
                                >
                                    sort_by_alpha
                                </i>
                            </th>
                            <th>
                                Количество
                                <i
                                    className="medium material-icons"
                                    onClick={() => sortQualityRout()}
                                >
                                    sort_by_alpha
                                </i>
                            </th>
                            <th>
                                Расстояние
                                <i
                                    className="medium material-icons"
                                    onClick={() => sortDistantRout()}
                                >
                                    sort_by_alpha
                                </i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRout.map((el) => {
                            return (
                                <tr key={el.id}>
                                    <td>{el.date}</td>
                                    <td>{el.name}</td>
                                    <td>{el.quality}</td>
                                    <td>{el.distant}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col" style={{ paddingTop: "30px" }}>
                <Pagination routPerPage={routPerPage} totalRout={rout.length} paginate={paginate}/>
                <button onClick={() => setVisibleFilter(() => !visibleFilter)}>Фильтр</button>
                <div
                    className="drop-down row "
                    style={{ display: visibleFilter ? "block" : "none" }}
                >
                    <label>Выберите колонку для фильтрации:
                    <select value={col} onChange={(event) => setCol(event.target.value)}>
                        <option value="0">Название</option>
                        <option value="1">Количество</option>
                        <option value="2">Расстояние</option>
                    </select>
                    </label>
                    <p/>
                    <label>Выбор условия:
                    <select value={condition} onChange={(event) => setCondition(event.target.value)}>
                        <option value="0">равно</option>
                        <option value="1">Содержит</option>
                        <option value="2">больше</option>
                        <option value="3">меньше</option>
                    </select>
                    </label>
                    <p/>
                    <label>Значение для фильтрации:
                        <input type='text' value={filterValue} onChange={(event) => setFilterValue(event.target.value)} ></input>
                    </label>
                    <p/>
                    <button className='me-2' onClick={() => applyFilter()} style={{width: '140px'}}>Применить</button>
                    <button onClick={() => resetFilter()} style={{width: '140px'}}>Сброс</button>
                </div>
            </div>
        </div>
    );
};

export default App;
