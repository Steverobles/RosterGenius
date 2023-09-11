import './CategoryList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFootball } from '@fortawesome/free-solid-svg-icons';

export default function CategoryList({ categories, activeCat, setActiveCat }) {
    const cats = categories.map(cat =>
        <li
            key={cat}
            className={cat === activeCat ? 'active' : ''}
            onClick={() => setActiveCat(cat)}
        >
            <FontAwesomeIcon icon={faFootball}  className='football-icon'/>
            {cat}
        </li>
        )
        return (
            <ul className='CategoryList'>
                {cats}
            </ul>
        )
}
