import {Nav} from 'react-bootstrap';
import Classes from './Tabs.module.scss' ;
import {useSearchParams} from 'react-router-dom' ;
import {NavLink } from 'react-router-dom' ;


function Tabs() {
  const [SearchParams]=useSearchParams() ;
  const dataMode = SearchParams.get('mode') ;
  return (
    
    <Nav fill variant="tabs" defaultActiveKey="/"  className={Classes.tabs} >
        <ul>
          <li><NavLink className={dataMode === null ? Classes.active : undefined} end to='/'>Daily</NavLink></li>
          <li><NavLink className={dataMode === 'monthly' ? Classes.active : undefined}  to='/?mode=monthly'>Monthly</NavLink></li>
          <li><NavLink className={dataMode === 'yearly' ? Classes.active : undefined}  to='/?mode=yearly'>Yearly</NavLink></li>
        </ul>
    </Nav>

  );
}

export default Tabs;